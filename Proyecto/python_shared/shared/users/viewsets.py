from .models import User
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .serializers import UserSerializer


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset allows to list and get details of users.
    Since we use IsAuthenticated and IsAdminUser
    permissions, only authenticated users with admin
    role can access this viewset.
    // no required for MVP
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
