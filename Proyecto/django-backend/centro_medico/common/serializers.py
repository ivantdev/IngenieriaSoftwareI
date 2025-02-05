from rest_framework import serializers
from pre_registrations.models import (
    PreRegistration,
    PreRegistrationMedicalInfo,
    ThirdParty,
)
from patients.models import Patient, PatientAdmission
from patients.serializers import PatientSerializer
from occupancy.serializers import ResourceUsageSerializer
from pre_registrations.serializers import (
    PreRegistrationMedicalInfoSerializer,
    ThirdPartySerializer,
)


class PreRegistrationCompleteSerializer(serializers.ModelSerializer):
    patient = PatientSerializer()
    medical_info = PreRegistrationMedicalInfoSerializer()
    third_party = ThirdPartySerializer()

    class Meta:
        model = PreRegistration
        fields = [
            "id",
            "patient",
            "medical_info",
            "third_party",
            "status",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def create(self, validated_data):
        patient_data = validated_data.pop("patient")
        medical_info_data = validated_data.pop("medical_info")
        third_party_data = validated_data.pop("third_party")

        patient = Patient.objects.create(**patient_data)
        medical_info = PreRegistrationMedicalInfo.objects.create(**medical_info_data)
        third_party = ThirdParty.objects.create(patient=patient, **third_party_data)

        pre_registration = PreRegistration.objects.create(
            patient=patient,
            medical_info=medical_info,
            third_party=third_party,
            **validated_data
        )
        return pre_registration


class PatientAdmissionSerializer(serializers.ModelSerializer):
    pre_registration = PreRegistrationCompleteSerializer(read_only=True)
    pre_registration_id = serializers.PrimaryKeyRelatedField(
        queryset=PreRegistration.objects.all(),
        source="pre_registration",
        write_only=True,
    )
    resource_usages = ResourceUsageSerializer(many=True, required=False)

    class Meta:
        model = PatientAdmission
        fields = [
            "id",
            "pre_registration",  # read only
            "pre_registration_id",  # write only
            "admission_date",
            "discharge_date",
            "admission_type",
            "triage_level",
            "admission_notes",
            "discharge_type",
            "discharge_notes",
            "resource_usages",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def validate(self, data):
        """
        Can add additional validation, for example:
        - Verify that if `discharge_date` is sent, it is greater than `admission_date`.
        """
        admission_date = data.get("admission_date", None)
        discharge_date = data.get("discharge_date", None)
        if admission_date and discharge_date and discharge_date < admission_date:
            raise serializers.ValidationError(
                "Discharge date must be after the admission date."
            )
        return data

    def create(self, validated_data):
        resource_usages_data = validated_data.pop("resource_usages", [])
        admission = super().create(validated_data)
        for usage_data in resource_usages_data:
            from occupancy.models import ResourceUsage

            ResourceUsage.objects.create(admission=admission, **usage_data)
        return admission
