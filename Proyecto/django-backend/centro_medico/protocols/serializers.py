from rest_framework import serializers
from .models import Specialty, SubSpecialty, Protocol


class SubSpecialtySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubSpecialty
        fields = ["id", "name"]


class SpecialtySerializer(serializers.ModelSerializer):
    sub_specialties = SubSpecialtySerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = Specialty
        fields = ["id", "name", "sub_specialties"]


class ProtocolSerializer(serializers.ModelSerializer):
    sub_specialty = SubSpecialtySerializer(read_only=True)
    sub_specialty_id = serializers.PrimaryKeyRelatedField(
        queryset=SubSpecialty.objects.all(), write_only=True
    )

    class Meta:
        model = Protocol
        fields = [
            "id",
            "name",
            "description",
            "file",
            "created_at",
            "updated_at",
            "sub_specialty",  # read only (get)
            "sub_specialty_id",  # write only (put, post)
        ]
        read_only_fields = ["id", "created_at", "updated_at"]
