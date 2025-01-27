from django.urls import path
from .views import OccupancyView, RegisterUserView

urlpatterns = [
    path('api/occupancy', OccupancyView.as_view(), name='occupancy'),
    path('api/register', RegisterUserView.as_view(), name='register_user'),
]