from django.db import models
from patients.models import Patient


class PreRegistrationMedicalInfo(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("expired", "Expired"),
        ("attended", "Attended"),
    ]

    reason = models.TextField(verbose_name="Reason")
    allergies = models.TextField(blank=True, null=True, verbose_name="Allergies")
    preexisting_conditions = models.TextField(
        blank=True, null=True, verbose_name="Preexisting Conditions"
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Creation Date")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Update Date")

    class Meta:
        verbose_name = "Pre-Registration Medical Info"
        verbose_name_plural = "Pre-Registration Medical Infos"

    def __str__(self):
        return f"Medical Info: {self.reason}"


class ThirdParty(models.Model):
    relationship = models.CharField(max_length=100, verbose_name="Relationship")
    first_name = models.CharField(max_length=100, verbose_name="First Name")
    last_name = models.CharField(max_length=100, verbose_name="Last Name")
    contact_number = models.CharField(max_length=20, verbose_name="Contact Number")
    email = models.EmailField(blank=True, null=True, verbose_name="Email")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Creation Date")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Update Date")

    class Meta:
        verbose_name = "Third Party"
        verbose_name_plural = "Third Parties"

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.relationship})"


class PreRegistration(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("expired", "Expired"),
        ("attended", "Attended"),
    ]

    patient = models.ForeignKey(
        Patient,
        on_delete=models.CASCADE,
        related_name="pre_registrations",
        verbose_name="Patient",
    )
    medical_info = models.ForeignKey(
        PreRegistrationMedicalInfo,
        on_delete=models.CASCADE,
        related_name="pre_registrations",
        verbose_name="Medical Info",
    )
    third_party = models.ForeignKey(
        ThirdParty,
        on_delete=models.CASCADE,
        related_name="pre_registrations",
        verbose_name="Third Party",
        null=True,
    )
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, verbose_name="Status"
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Creation Date")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Update Date")

    class Meta:
        verbose_name = "Pre-Registration"
        verbose_name_plural = "Pre-Registrations"

    def __str__(self):
        return f"Pre-Registration for {self.patient}"
