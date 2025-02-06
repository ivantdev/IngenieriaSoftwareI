from rest_framework import serializers
from .models import PreRegistrationMedicalInfo, ThirdParty


class PreRegistrationMedicalInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PreRegistrationMedicalInfo
        fields = [
            "id",
            "reason",
            "allergies",
            "preexisting_conditions",
            "status",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]


class ThirdPartySerializer(serializers.ModelSerializer):
    class Meta:
        model = ThirdParty
        fields = [
            "id",
            "relationship",
            "first_name",
            "last_name",
            "contact_number",
            "email",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]
