from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import ProtocolViewSet
from .viewsets import SpecialtyViewSet

router = DefaultRouter()
router.register(r"protocols", ProtocolViewSet, basename="protocol")
router.register(
    r"protocol-specialties", SpecialtyViewSet, basename="protocol-specialties"
)

urlpatterns = [
    path("", include(router.urls)),
]
