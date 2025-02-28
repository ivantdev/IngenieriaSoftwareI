from django.test import TestCase
from django.utils import timezone
from occupancy.models import (
    ResourceType,
    MedicalCenterCapacity,
    ResourceUsage,
    OccupancyHistory,
)
from patients.models import PatientAdmission, Patient
from pre_registrations.models import (
    PreRegistration,
    PreRegistrationMedicalInfo,
    ThirdParty,
)


class OccupancyTestCase(TestCase):
    def setUp(self):
        # Create a ResourceType
        self.resource_type = ResourceType.objects.create(resource_name="ICU Bed")

        # Create a Patient
        self.patient = Patient.objects.create(
            first_name="John",
            last_name="Doe",
            birth_date="1990-01-01",
            id_type="Passport",
            id_number="A123456789",
            contact_number="1234567890",
            email="johndoe@example.com",
        )

        self.medical_info = PreRegistrationMedicalInfo.objects.create(
            reason="Routine Checkup",
        )

        self.third_party = ThirdParty.objects.create(
            relationship="Spouse",
            first_name="Jane",
            last_name="Doe",
            contact_number="0987654321",
        )

        # Create PreRegistration with medical_info
        self.pre_registration = PreRegistration.objects.create(
            patient=self.patient,
            medical_info=self.medical_info,
            third_party=self.third_party,
            status="pending",
        )

        # Create a PatientAdmission
        self.admission = PatientAdmission.objects.create(
            pre_registration=self.pre_registration,
            admission_type="hospitalization",
            triage_level=5,
            admission_date=timezone.now(),
        )

    def test_create_resource_usage(self):
        """Test creating a ResourceUsage record"""
        usage = ResourceUsage.objects.create(
            admission=self.admission,
            resource_type=self.resource_type,
            resource_quantity=3,
            start_time=timezone.now(),
        )
        self.assertEqual(usage.resource_quantity, 3)
        self.assertEqual(usage.admission, self.admission)
        self.assertEqual(usage.resource_type, self.resource_type)

    def test_create_medical_center_capacity(self):
        """Test creating a MedicalCenterCapacity record"""
        capacity = MedicalCenterCapacity.objects.create(
            resource_type=self.resource_type, total_quantity=10
        )
        self.assertEqual(capacity.total_quantity, 10)
        self.assertEqual(capacity.resource_type, self.resource_type)

    def test_create_occupancy_history(self):
        """Test creating an OccupancyHistory record"""
        history = OccupancyHistory.objects.create(
            resource_type=self.resource_type,
            occupied_quantity=5,
            occupancy_percentage=50.00,
            created_at=timezone.now(),
        )
        self.assertEqual(history.occupied_quantity, 5)
        self.assertEqual(float(history.occupancy_percentage), 50.00)
        self.assertEqual(history.resource_type, self.resource_type)

    def test_create_resource_type(self):
        """Test creating a ResourceType record"""
        resource = ResourceType.objects.create(resource_name="Ventilator")
        self.assertEqual(resource.resource_name, "Ventilator")
