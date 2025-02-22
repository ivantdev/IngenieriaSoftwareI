from django.test import TestCase
from rest_framework.exceptions import ValidationError

from common.serializers import PreRegistrationCompleteSerializer

from pre_registrations.models import PreRegistration
from patients.models import Patient


class PreRegistrationCompleteSerializerTests(TestCase):
    def setUp(self):
        self.existing_patient = Patient.objects.create(
            first_name="Paciente",
            last_name="Existente",
            birth_date="1980-01-01",
            id_type="CC",
            id_number="11111111",
            contact_number="123456789",
            email="existente@example.com",
        )

    def test_create_without_patient_data(self):
        """
        If no patient data is sent,
        it should throw validation error.
        """
        data = {"status": PreRegistration.PENDING}
        serializer = PreRegistrationCompleteSerializer(data=data)
        with self.assertRaises(ValidationError) as context:
            serializer.is_valid(raise_exception=True)
        self.assertIn("patient", context.exception.detail)
        self.assertEqual(
            context.exception.detail["patient"], "Patient data is required."
        )

    def test_invalid_patient_missing_required_fields_without_id(self):
        """
        If send `patient` data without `id`, and missing other required fields to create a `patient`
        it should throw validation errors.
        """
        data = {
            "patient": {"first_name": "Juan"},  # Missing other required fields
            "status": PreRegistration.PENDING,
        }
        serializer = PreRegistrationCompleteSerializer(data=data)
        with self.assertRaises(ValidationError) as context:
            serializer.is_valid(raise_exception=True)
        self.assertIn("patient", context.exception.detail)
        self.assertIn(
            "Missing required fields", str(context.exception.detail["patient"])
        )

    def test_invalid_third_party_missing_required_fields(self):
        """
        If send `third_party` data, but missing fields,
        it should throw validation errors.
        """
        data = {
            "patient": {
                "first_name": "Juan",
                "last_name": "Pérez",
                "birth_date": "1990-01-01",
                "id_type": "CC",
                "id_number": "12345678",
                "contact_number": "123456789",
                "email": "juan@example.com",
            },
            "third_party": {
                "first_name": "María",
                "last_name": "Gómez",
                "contact_number": "987654321",  # missing relationship
            },
            "status": PreRegistration.PENDING,
        }
        serializer = PreRegistrationCompleteSerializer(data=data)
        with self.assertRaises(ValidationError) as context:
            serializer.is_valid(raise_exception=True)
        self.assertIn("third_party", context.exception.detail)
        self.assertIn(
            "Missing required fields", str(context.exception.detail["third_party"])
        )

    def test_invalid_medical_info_missing_field_with_existing_patient(self):
        """
        If send a existing `patient`, but missing `medical_info`,
        it should throw validation errors.
        """
        data = {
            "patient": {"id": self.existing_patient.id},
            "status": PreRegistration.PENDING,
        }
        serializer = PreRegistrationCompleteSerializer(data=data)
        with self.assertRaises(ValidationError) as context:
            serializer.is_valid(raise_exception=True)
        self.assertIn("medical_info", context.exception.detail)
        self.assertIn(
            "Medical_info data is required.",
            str(context.exception.detail["medical_info"]),
        )

    def test_invalid_medical_info_missing_fields_with_existing_patient(self):
        """
        If send a existing `patient`, but missing `medical_info` required fiels,
        it should throw validation errors.
        """
        data = {
            "patient": {"id": self.existing_patient.id},
            "status": PreRegistration.PENDING,
            "medical_info": {"reason": ""},
        }
        serializer = PreRegistrationCompleteSerializer(data=data)
        with self.assertRaises(ValidationError) as context:
            serializer.is_valid(raise_exception=True)
        self.assertIn("medical_info", context.exception.detail)
        self.assertIn(
            "Missing required fields", str(context.exception.detail["medical_info"])
        )

    def test_create_with_existing_patient(self):
        """
        When a `patient` exists, should use `patient` `id` existing.
        """
        medical_info_data = {
            "reason": "dolor",
            "allergies": "none",
            "preexisting_conditions": "none",
        }
        data = {
            "patient": {"id": self.existing_patient.id},
            "status": PreRegistration.PENDING,
            "medical_info": medical_info_data,
        }
        serializer = PreRegistrationCompleteSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        instance = serializer.save()
        self.assertEqual(instance.patient.id, self.existing_patient.id)

    def test_create_with_new_patient(self):
        """
        If not `patient` `id` is sent, should create a new `patient`.
        Should include all required fields.
        """
        patient_data = {
            "first_name": "Nuevo",
            "last_name": "Paciente",
            "birth_date": "1995-05-05",
            "id_type": "CC",
            "id_number": "22222222",
            "contact_number": "555555555",
            "email": "nuevo@example.com",
        }
        medical_info_data = {
            "reason": "dolor",
            "allergies": "none",
            "preexisting_conditions": "none",
        }
        data = {
            "patient": patient_data,
            "status": PreRegistration.PENDING,
            "medical_info": medical_info_data,
        }
        serializer = PreRegistrationCompleteSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        instance = serializer.save()
        self.assertEqual(instance.patient.first_name, "Nuevo")

    def test_create_with_all_nested_data(self):
        """
        Test successful creation when all data is send.
        (
            patient,
            third_party,
            medical_info
        )
        """
        patient_data = {
            "first_name": "Ana",
            "last_name": "López",
            "birth_date": "1992-02-02",
            "id_type": "DNI",
            "id_number": "33333333",
            "contact_number": "444444444",
            "email": "ana@example.com",
        }
        third_party_data = {
            "relationship": "amiga",
            "first_name": "Clara",
            "last_name": "Martínez",
            "contact_number": "999999999",
        }
        medical_info_data = {
            "reason": "dolor",
            "allergies": "none",
            "preexisting_conditions": "none",
        }
        data = {
            "patient": patient_data,
            "third_party": third_party_data,
            "medical_info": medical_info_data,
            "status": PreRegistration.PENDING,
        }
        serializer = PreRegistrationCompleteSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        instance = serializer.save()
        self.assertIsNotNone(instance.medical_info)
        self.assertIsNotNone(instance.third_party)
        self.assertEqual(instance.patient.first_name, "Ana")
        self.assertEqual(instance.third_party.first_name, "Clara")
        self.assertEqual(instance.medical_info.reason, "dolor")
