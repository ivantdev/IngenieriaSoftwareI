# Generated by Django 5.1.5 on 2025-02-02 02:18

import django.core.validators
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Patient",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "first_name",
                    models.CharField(max_length=100, verbose_name="First Name"),
                ),
                (
                    "last_name",
                    models.CharField(max_length=100, verbose_name="Last Name"),
                ),
                ("birth_date", models.DateField(verbose_name="Birth Date")),
                (
                    "id_type",
                    models.CharField(max_length=50, verbose_name="Identification Type"),
                ),
                (
                    "id_number",
                    models.CharField(
                        max_length=100,
                        unique=True,
                        verbose_name="Identification Number",
                    ),
                ),
                (
                    "contact_number",
                    models.CharField(max_length=20, verbose_name="Contact Number"),
                ),
                (
                    "email",
                    models.EmailField(
                        max_length=254, unique=True, verbose_name="Email"
                    ),
                ),
                (
                    "created_at",
                    models.DateTimeField(
                        auto_now_add=True, verbose_name="Creation Date"
                    ),
                ),
                (
                    "updated_at",
                    models.DateTimeField(auto_now=True, verbose_name="Update Date"),
                ),
            ],
        ),
        migrations.CreateModel(
            name="PatientAdmission",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "admission_date",
                    models.DateTimeField(
                        default=django.utils.timezone.now, verbose_name="Admission Date"
                    ),
                ),
                (
                    "discharge_date",
                    models.DateTimeField(
                        blank=True, null=True, verbose_name="Discharge Date"
                    ),
                ),
                (
                    "admission_type",
                    models.CharField(
                        choices=[
                            ("emergency", "Emergency"),
                            ("hospitalization", "Hospitalization"),
                            ("scheduled_surgery", "Scheduled Surgery"),
                            ("outpatient", "Outpatient"),
                            ("maternity", "Maternity"),
                            ("icu", "ICU"),
                            ("observation", "Observation"),
                        ],
                        max_length=50,
                        verbose_name="Admission Type",
                    ),
                ),
                (
                    "triage_level",
                    models.IntegerField(
                        validators=[
                            django.core.validators.MinValueValidator(1),
                            django.core.validators.MaxValueValidator(10),
                        ],
                        verbose_name="Triage Level",
                    ),
                ),
                (
                    "admission_notes",
                    models.TextField(
                        blank=True, null=True, verbose_name="Admission Notes"
                    ),
                ),
                (
                    "discharge_type",
                    models.CharField(
                        blank=True,
                        choices=[
                            ("normal", "Normal"),
                            ("transfer", "Transfer"),
                            ("other", "Other"),
                        ],
                        max_length=50,
                        null=True,
                        verbose_name="Discharge Type",
                    ),
                ),
                (
                    "discharge_notes",
                    models.TextField(
                        blank=True, null=True, verbose_name="Discharge Notes"
                    ),
                ),
                (
                    "created_at",
                    models.DateTimeField(
                        auto_now_add=True, verbose_name="Creation Date"
                    ),
                ),
                (
                    "updated_at",
                    models.DateTimeField(auto_now=True, verbose_name="Update Date"),
                ),
            ],
            options={
                "verbose_name": "Patient Admission",
                "verbose_name_plural": "Patient Admissions",
            },
        ),
    ]
