from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import ResourceType, MedicalCenterCapacity, ResourceUsage, OccupancyHistory
from .serializers import (
    ResourceTypeSerializer,
    MedicalCenterCapacitySerializer,
    ResourceUsageSerializer,
    OccupancyHistorySerializer,
)
from django.utils import timezone


class ResourceTypeViewSet(viewsets.ModelViewSet):
    queryset = ResourceType.objects.all()
    serializer_class = ResourceTypeSerializer
    permission_classes = [IsAuthenticated]


class MedicalCenterCapacityViewSet(viewsets.ModelViewSet):
    queryset = MedicalCenterCapacity.objects.all()
    serializer_class = MedicalCenterCapacitySerializer
    permission_classes = [IsAuthenticated]


class ResourceUsageViewSet(viewsets.ModelViewSet):
    queryset = ResourceUsage.objects.all()
    serializer_class = ResourceUsageSerializer
    permission_classes = [IsAuthenticated]


class OccupancyHistoryViewSet(viewsets.ModelViewSet):
    queryset = OccupancyHistory.objects.all()
    serializer_class = OccupancyHistorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        time_range = self.request.query_params.get("time_range")
        if time_range:
            try:
                hours = float(time_range)
                time_threshold = timezone.now() - timezone.timedelta(hours=hours)
                queryset = queryset.filter(created_at__gte=time_threshold)
            except ValueError:
                pass
        return queryset
