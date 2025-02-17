from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import PatientAdmissionViewSet
from .viewsets import PatientQueryViewSet

router = DefaultRouter()
router.register(
    r"patient-admissions", PatientAdmissionViewSet, basename="patient_admission"
)
router.register(r"patients", PatientQueryViewSet, basename="patient_query")

urlpatterns = [
    path("", include(router.urls)),
]
