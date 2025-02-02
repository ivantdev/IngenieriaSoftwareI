from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import UserViewSet
from .views import RegistrationAPIView, LoginAPIView, LogoutAPIView

router = DefaultRouter()
router.register(r"users", UserViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("register/", RegistrationAPIView.as_view(), name="register"),
    path("login/", LoginAPIView.as_view(), name="login"),
    path("logout/", LogoutAPIView.as_view(), name="logout"),
]
