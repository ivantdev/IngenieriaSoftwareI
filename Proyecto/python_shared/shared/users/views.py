from django.contrib.auth import authenticate, login, logout
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegistrationSerializer, LoginSerializer, UserSerializer


class RegistrationAPIView(APIView):
    permission_classes = []
    authentication_classes = []

    def post(self, request, format=None):
        serializer = RegistrationSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            login(request, user)
            user_data = UserSerializer(user).data
            return Response(user_data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginAPIView(APIView):
    permission_classes = []
    authentication_classes = []

    def post(self, request, format=None):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data.get("email")
            password = serializer.validated_data.get("password")

            user = authenticate(
                request, username=email, password=password
            )  # here we are using our custom backend

            if user is None:
                return Response(
                    {"detail": "Bad credentials."}, status=status.HTTP_400_BAD_REQUEST
                )
            if not user.is_active:
                return Response(
                    {"detail": "Inactive user."}, status=status.HTTP_400_BAD_REQUEST
                )

            login(request, user)
            user_data = UserSerializer(user).data
            return Response(user_data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutAPIView(APIView):
    def post(self, request, format=None):
        logout(request)
        return Response({"detail": "Logout successful."}, status=status.HTTP_200_OK)
