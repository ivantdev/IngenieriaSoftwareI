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

    def get_queryset(self):
        """
        Allow filtering by pre-registration `id` and patient `id_number`
        if provided in query parameters.
        """

        queryset = super().get_queryset()
        id = self.request.query_params.get("id")
        id_number = self.request.query_params.get("id_number")
        if id:
            queryset = queryset.filter(id=id, status=PreRegistration.PENDING)
        if id_number:
            queryset = queryset.filter(
                patient__id_number=id_number,
                status=PreRegistration.PENDING,
            )

        return queryset
