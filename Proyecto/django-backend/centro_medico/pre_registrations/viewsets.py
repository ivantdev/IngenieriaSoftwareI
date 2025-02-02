from rest_framework import mixins, viewsets
from .models import PreRegistration
from common.serializers import PreRegistrationCompleteSerializer


class PreRegistrationLimitedViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    queryset = PreRegistration.objects.all()
    serializer_class = PreRegistrationCompleteSerializer
    permission_classes = []
