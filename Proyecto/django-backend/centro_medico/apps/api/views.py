from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import status
from datetime import datetime, timedelta
from django.core.exceptions import ValidationError
from django.contrib.auth.hashers import make_password
import random

class OccupancyView(APIView):
    def get(self, request):
        # Obtener parámetros de fecha opcionales
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')

        try:
            # Validación de fechas (si se proporcionan)
            if start_date:
                start_date = datetime.strptime(start_date, '%Y-%m-%d')
            if end_date:
                end_date = datetime.strptime(end_date, '%Y-%m-%d')
                if start_date and start_date > end_date:
                    return Response({
                        "status": "error",
                        "message": "La fecha de inicio no puede ser mayor que la fecha de fin."
                    }, status=status.HTTP_400_BAD_REQUEST)

            # Datos simulados (esto sería reemplazado por lógica o consultas reales)
            total_beds = 100
            occupied_beds = 70
            available_beds = total_beds - occupied_beds
            occupancy_percentage = (occupied_beds / total_beds) * 100

            # Datos históricos simulados
            historical_occupancy = [
                {"date": (datetime.now() - timedelta(days=i)).strftime('%Y-%m-%d'), "occupancy_percentage": 65 + i}
                for i in range(7)  # Últimos 7 días
            ]

            # Aplicar filtros de fechas a datos históricos (si se proporcionan)
            if start_date or end_date:
                historical_occupancy = [
                    record for record in historical_occupancy
                    if (not start_date or datetime.strptime(record["date"], '%Y-%m-%d') >= start_date) and
                       (not end_date or datetime.strptime(record["date"], '%Y-%m-%d') <= end_date)
                ]

            # Respuesta exitosa
            return Response({
                "status": "success",
                "data": {
                    "current_occupancy": {
                        "total_beds": total_beds,
                        "occupied_beds": occupied_beds,
                        "available_beds": available_beds,
                        "occupancy_percentage": occupancy_percentage
                    },
                    "historical_occupancy": historical_occupancy
                }
            }, status=status.HTTP_200_OK)

        except Exception as e:
            # Respuesta de error en caso de una excepción del servidor
            return Response({
                "status": "error",
                "message": "Error interno del servidor. Intente nuevamente más tarde."
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RegisterUserView(APIView):
    def post(self, request, *args, **kwargs):
        # Extraer datos del cuerpo de la solicitud
        try:
            user_data = request.data.get('data', {}).get('user', {})
        except AttributeError:
            return Response(
                {"status": "error", "message": "Solicitud inválida. Revise los datos ingresados."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Validar campos requeridos
        required_fields = ['first_name', 'last_name', 'email', 'password']
        missing_fields = [field for field in required_fields if not user_data.get(field)]

        if missing_fields:
            return Response(
                {
                    "status": "error",
                    "message": f"Validación fallida. Campos incorrectos o vacíos: {', '.join(missing_fields)}."
                },
                status=status.HTTP_422_UNPROCESSABLE_ENTITY
            )

        # Validar formato de email
        email = user_data.get('email')
        if not email or '@' not in email:
            return Response(
                {
                    "status": "error",
                    "message": "Solicitud inválida. Por favor, revise los datos ingresados en el campo 'email'."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # Verificar si el email ya está registrado
        if User.objects.filter(email=email).exists():
            return Response(
                {"status": "error", "message": "El correo electrónico ya está registrado."},
                status=status.HTTP_422_UNPROCESSABLE_ENTITY
            )

        # Crear usuario
        try:
            user = User.objects.create(
                first_name=user_data['first_name'],
                last_name=user_data['last_name'],
                email=user_data['email'],
                username=user_data['email'],  # Usar el email como nombre de usuario
                password=make_password(user_data['password'])  # Hashear la contraseña
            )
        except ValidationError as e:
            return Response(
                {"status": "error", "message": f"Error de validación: {str(e)}."},
                status=status.HTTP_422_UNPROCESSABLE_ENTITY
            )
        except Exception as e:
            return Response(
                {"status": "error", "message": "Error interno del servidor. Intente nuevamente más tarde."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        # Generar código de activación (simulado)
        activation_code = f"ACT-{random.randint(100000, 999999)}"

        # Respuesta exitosa
        return Response(
            {
                "status": "success",
                "data": {
                    "id": user.id,
                    "activation_code": activation_code,
                    "user": {
                        "first_name": user.first_name,
                        "last_name": user.last_name,
                        "email": user.email
                    }
                }
            },
            status=status.HTTP_201_CREATED
        )