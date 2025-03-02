from django.utils.timezone import now
from occupancy.models import (
    ResourceType,
    OccupancyHistory,
    MedicalCenterCapacity,
    ResourceUsage,
)
from django.db.models import Sum


def record_occupancy():
    """
    Registers the occupancy of each resource type in the history every hour.
    """
    print(now(), " 🧨 Occupancy record")
    resource_types = ResourceType.objects.all()

    for resource_type in resource_types:
        total_capacity = MedicalCenterCapacity.objects.filter(
            resource_type=resource_type
        ).first()
        total_capacity_value = total_capacity.total_quantity if total_capacity else 0

        occupied_quantity = (
            ResourceUsage.objects.filter(
                resource_type=resource_type, end_time__isnull=True
            ).aggregate(total=Sum("resource_quantity"))["total"]
            or 0
        )

        occupancy_percentage = (
            (occupied_quantity / total_capacity_value) * 100
            if total_capacity_value > 0
            else 0
        )

        OccupancyHistory.objects.create(
            resource_type=resource_type,
            occupied_quantity=occupied_quantity,
            occupancy_percentage=round(occupancy_percentage, 2),
            created_at=now(),
        )

    return {"message": "Occupancy recorded successfully"}
