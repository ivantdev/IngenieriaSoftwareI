from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone


class Patient(models.Model):
    first_name = models.CharField(max_length=100, verbose_name="First Name")
    last_name = models.CharField(max_length=100, verbose_name="Last Name")
    birth_date = models.DateField(verbose_name="Birth Date")
    id_type = models.CharField(max_length=50, verbose_name="Identification Type")
    id_number = models.CharField(
        max_length=100, unique=True, verbose_name="Identification Number"
    )
    contact_number = models.CharField(max_length=20, verbose_name="Contact Number")
    email = models.EmailField(unique=True, verbose_name="Email")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Creation Date")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Update Date")

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class PatientAdmission(models.Model):
    ADMISSION_TYPE_CHOICES = [
        ("emergency", "Emergency"),
        ("hospitalization", "Hospitalization"),
        ("scheduled_surgery", "Scheduled Surgery"),
        ("outpatient", "Outpatient"),
        ("maternity", "Maternity"),
        ("icu", "ICU"),
        ("observation", "Observation"),
    ]

    DISCHARGE_TYPE_CHOICES = [
        ("normal", "Normal"),
        ("transfer", "Transfer"),
        ("other", "Other"),
    ]

    pre_registration = models.ForeignKey(
        "pre_registrations.PreRegistration",  # Avoid circular import with Lazy Reference (string)
        on_delete=models.CASCADE,
        related_name="admissions",
        verbose_name="Pre-Registration",
    )

    admission_date = models.DateTimeField(
        default=timezone.now, verbose_name="Admission Date"
    )
    discharge_date = models.DateTimeField(
        null=True, blank=True, verbose_name="Discharge Date"
    )

    admission_type = models.CharField(
        max_length=50, choices=ADMISSION_TYPE_CHOICES, verbose_name="Admission Type"
    )
    triage_level = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(10)],
        verbose_name="Triage Level",
    )

    admission_notes = models.TextField(
        null=True, blank=True, verbose_name="Admission Notes"
    )
    discharge_type = models.CharField(
        max_length=50,
        choices=DISCHARGE_TYPE_CHOICES,
        null=True,
        blank=True,
        verbose_name="Discharge Type",
    )
    discharge_notes = models.TextField(
        null=True, blank=True, verbose_name="Discharge Notes"
    )

    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Creation Date")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Update Date")

    class Meta:
        verbose_name = "Patient Admission"
        verbose_name_plural = "Patient Admissions"

    def __str__(self):
        return (
            f"Admission (ID: {self.id}) for Pre-Registration {self.pre_registration.id} "
            f"on {self.admission_date.strftime('%Y-%m-%d %H:%M')}"
        )
