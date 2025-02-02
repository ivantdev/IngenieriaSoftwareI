from django.db import models
from patients.models import PatientAdmission


class ResourceType(models.Model):
    resource_name = models.CharField(
        max_length=100, unique=True, verbose_name="Resource Name"
    )

    class Meta:
        verbose_name = "Resource Type"
        verbose_name_plural = "Resource Types"

    def __str__(self):
        return self.resource_name


class MedicalCenterCapacity(models.Model):
    resource_type = models.ForeignKey(
        ResourceType,
        on_delete=models.CASCADE,
        related_name="capacities",
        verbose_name="Resource Type",
    )
    total_quantity = models.PositiveIntegerField(verbose_name="Total Quantity")

    class Meta:
        verbose_name = "Medical Center Capacity"
        verbose_name_plural = "Medical Center Capacities"

    def __str__(self):
        return f"{self.resource_type.resource_name} Capacity: {self.total_quantity}"


class ResourceUsage(models.Model):
    admission = models.ForeignKey(
        PatientAdmission,
        on_delete=models.CASCADE,
        related_name="resource_usages",
        verbose_name="Admission",
    )
    resource_type = models.ForeignKey(
        ResourceType,
        on_delete=models.CASCADE,
        related_name="usages",
        verbose_name="Resource Type",
    )
    resource_quantity = models.PositiveIntegerField(verbose_name="Resource Quantity")
    start_time = models.DateTimeField(
        auto_now_add=True, verbose_name="Usage Start Time"
    )
    end_time = models.DateTimeField(
        null=True, blank=True, verbose_name="Usage End Time"
    )

    class Meta:
        verbose_name = "Resource Usage"
        verbose_name_plural = "Resource Usages"

    def __str__(self):
        return f"{self.resource_quantity} {self.resource_type} for Admission {self.admission.id}"


class OccupancyHistory(models.Model):
    resource_type = models.ForeignKey(
        ResourceType,
        on_delete=models.CASCADE,
        related_name="occupancy_histories",
        verbose_name="Resource Type",
    )
    occupied_quantity = models.PositiveIntegerField(verbose_name="Occupied Quantity")
    occupancy_percentage = models.DecimalField(
        max_digits=5, decimal_places=2, verbose_name="Occupancy Percentage"
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Creation Date")

    class Meta:
        verbose_name = "Occupancy History"
        verbose_name_plural = "Occupancy Histories"

    def __str__(self):
        return f"{self.resource_type.resource_name} Occupancy: {self.occupancy_percentage}%"
