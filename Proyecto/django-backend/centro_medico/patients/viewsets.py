from rest_framework import mixins, viewsets
from rest_framework.permissions import IsAuthenticated
from .models import PatientAdmission
from common.serializers import PatientAdmissionSerializer


class PatientAdmissionViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    """
    This viewset handles patient admissions.
    It allows creating a new admission (linked to a pre-registration), listing admissions,
    retrieving a specific admission (with full pre-registration details),
    and updating an admission (e.g., to record discharge information).
    """

    queryset = PatientAdmission.objects.all()
    serializer_class = PatientAdmissionSerializer
    permission_classes = [IsAuthenticated]
