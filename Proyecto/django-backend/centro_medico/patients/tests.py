from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from patients.models import Patient  # Importa tu modelo de paciente
from datetime import date


class PatientQueryViewSetTest(APITestCase):

    def setUp(self):
        """Configuración inicial antes de cada test"""

        self.patient1 = Patient.objects.create(
            id_type="CC",
            id_number="123456",
            first_name="Juan",
            last_name="Perez",
            birth_date=date(1990, 5, 15),
            contact_number="1234567890",
            email="dhurtados@unal.edu.co",
        )
        self.patient2 = Patient.objects.create(
            id_type="TI",
            id_number="654321",
            first_name="Maria",
            last_name="Gomez",
            birth_date=date(2000, 8, 20),
            contact_number="1234567890",
            email="ivancho@unal.edu.co",
        )

    def test_get_all_patients(self):
        """Verifica que la vista devuelve todos los pacientes si no se aplican filtros"""

        url = reverse(
            "patient_query-list"
        )  # Ajusta el nombre si es diferente en tus rutas
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)  # Deben existir 2 pacientes en la BD

    def test_filter_by_id_type_and_id_number(self):
        """Verifica que el filtro por id_type y id_number funciona correctamente"""
        url = reverse("patient_query-list") + "?id_type=CC&id_number=123456"
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)  # Solo debería devolver un paciente
        self.assertEqual(
            response.data[0]["first_name"], "Juan"
        )  # Confirma que es el correcto

    def test_filter_with_invalid_params(self):
        """Verifica que un filtro con parámetros inexistentes no devuelve resultados"""
        url = reverse("patient_query-list") + "?id_type=CE&id_number=999999"
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)  # No debería encontrar ningún paciente
