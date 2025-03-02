# occupancy/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import (
    ResourceTypeViewSet,
    MedicalCenterCapacityViewSet,
    ResourceUsageViewSet,
    OccupancyHistoryViewSet,
)
from .views import SystemStatisticsView

router = DefaultRouter()
router.register(r"resource-types", ResourceTypeViewSet, basename="resource-type")
router.register(r"capacities", MedicalCenterCapacityViewSet, basename="capacity")
router.register(r"resource-usages", ResourceUsageViewSet, basename="resource-usage")
router.register(
    r"occupancy-histories", OccupancyHistoryViewSet, basename="occupancy-history"
)

urlpatterns = [
    path("", include(router.urls)),
    path(
        "system-statistics/", SystemStatisticsView.as_view(), name="system-statistics"
    ),
]
