from rest_framework import serializers
from .models import ResourceType, MedicalCenterCapacity, ResourceUsage, OccupancyHistory
from patients.models import PatientAdmission


class ResourceTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResourceType
        fields = ["id", "resource_name"]


class MedicalCenterCapacitySerializer(serializers.ModelSerializer):
    resource_type = ResourceTypeSerializer(read_only=True)
    resource_type_id = serializers.PrimaryKeyRelatedField(
        queryset=ResourceType.objects.all(), source="resource_type", write_only=True
    )

    class Meta:
        model = MedicalCenterCapacity
        fields = ["id", "resource_type", "resource_type_id", "total_quantity"]
        read_only_fields = ["id"]


class ResourceUsageSerializer(serializers.ModelSerializer):
    admission_id = serializers.PrimaryKeyRelatedField(
        queryset=PatientAdmission.objects.all(), source="admission", write_only=True
    )
    resource_type = ResourceTypeSerializer(read_only=True)
    resource_type_id = serializers.PrimaryKeyRelatedField(
        queryset=ResourceType.objects.all(), source="resource_type", write_only=True
    )

    class Meta:
        model = ResourceUsage
        fields = [
            "id",
            "admission_id",
            "resource_type",
            "resource_type_id",
            "resource_quantity",
            "start_time",
            "end_time",
        ]
        read_only_fields = ["id", "start_time"]


class OccupancyHistorySerializer(serializers.ModelSerializer):
    resource_type = ResourceTypeSerializer(read_only=True)
    resource_type_id = serializers.PrimaryKeyRelatedField(
        queryset=ResourceType.objects.all(), source="resource_type", write_only=True
    )
    occupancy_percentage = serializers.FloatField()

    class Meta:
        model = OccupancyHistory
        fields = [
            "id",
            "resource_type",
            "resource_type_id",
            "occupied_quantity",
            "occupancy_percentage",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]
