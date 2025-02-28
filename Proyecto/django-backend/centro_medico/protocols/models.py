from django.db import models


class Specialty(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class SubSpecialty(models.Model):
    name = models.CharField(max_length=100, unique=True)
    specialty = models.ForeignKey(
        Specialty, on_delete=models.CASCADE, related_name="sub_specialties"
    )

    def __str__(self):
        return self.name


class Protocol(models.Model):
    sub_specialty = models.ForeignKey(
        SubSpecialty, on_delete=models.CASCADE, related_name="protocols"
    )
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    file = models.FileField(upload_to="protocol-files/", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
