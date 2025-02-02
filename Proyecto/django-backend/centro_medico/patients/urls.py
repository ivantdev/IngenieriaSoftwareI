from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import PatientAdmissionViewSet

router = DefaultRouter()
router.register(
    r"patient-admissions", PatientAdmissionViewSet, basename="patient_admission"
)

urlpatterns = [
    path("", include(router.urls)),
]
