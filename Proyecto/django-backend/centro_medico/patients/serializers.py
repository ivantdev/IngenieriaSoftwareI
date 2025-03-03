from rest_framework import serializers
from .models import Patient, PatientAdmission


class PatientAdmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientAdmission
        fields = [
            "admission_date",
            "discharge_date",
            "admission_type",
            "triage_level",
            "admission_notes",
            "discharge_type",
            "discharge_notes",
        ]


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = [
            "id",
            "first_name",
            "last_name",
            "birth_date",
            "id_type",
            "id_number",
            "contact_number",
            "email",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]


class PatientQuerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = [
            "id",
            "first_name",
            "last_name",
            "id_number",
        ]
        read_only_fields = ["id"]
