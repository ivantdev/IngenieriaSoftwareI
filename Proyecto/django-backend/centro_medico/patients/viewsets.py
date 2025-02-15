from rest_framework import mixins, viewsets
from rest_framework.permissions import IsAuthenticated
from .models import PatientAdmission
from common.serializers import PatientAdmissionSerializer
from .models import Patient
from .serializers import PatientQuerySerializer


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


class PatientQueryViewSet(
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    """
    This viewset handles patient filtering and searching.
    Allow filtering by id_type and id_number, and searching by first_name and last_name.
    """

    queryset = Patient.objects.all()
    serializer_class = PatientQuerySerializer
    filterset_fields = ["id_type", "id_number"]
    search_fields = ["first_name", "last_name"]

    def get_queryset(self):
        """
        Allow filtering by id_type and id_number if provided in query parameters.
        """
        queryset = super().get_queryset()
        id_type = self.request.query_params.get("id_type")
        id_number = self.request.query_params.get("id_number")
        if id_type and id_number:
            queryset = queryset.filter(id_type=id_type, id_number=id_number)
        return queryset
