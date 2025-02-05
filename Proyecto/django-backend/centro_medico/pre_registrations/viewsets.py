from rest_framework import mixins, viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import PreRegistration
from common.serializers import PreRegistrationCompleteSerializer


class PreRegistrationLimitedViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    queryset = PreRegistration.objects.all()
    serializer_class = PreRegistrationCompleteSerializer

    def get_permissions(self):
        if self.action in ["create", "list", "retrieve"]:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
