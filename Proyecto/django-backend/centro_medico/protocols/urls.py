from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import ProtocolViewSet

router = DefaultRouter()
router.register(r"protocols", ProtocolViewSet, basename="protocol")

urlpatterns = [
    path("", include(router.urls)),
]
