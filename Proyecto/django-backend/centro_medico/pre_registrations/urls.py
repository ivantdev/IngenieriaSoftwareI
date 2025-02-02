from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import PreRegistrationLimitedViewSet

router = DefaultRouter()
router.register(
    r"pre-registration", PreRegistrationLimitedViewSet, basename="patient_admission"
)

urlpatterns = [
    path("", include(router.urls)),
]
