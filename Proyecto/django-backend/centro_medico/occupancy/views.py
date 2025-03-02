from django.db.models import Count
from django.utils.timezone import now, timedelta
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from pre_registrations.models import PreRegistration
from patients.models import PatientAdmission
from shared.notifications.models import Notification
from occupancy.models import OccupancyHistory, ResourceType
from occupancy.serializers import OccupancyHistorySerializer, ResourceTypeSerializer


class SystemStatisticsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        User = get_user_model()
        period = request.query_params.get("period", "7h")

        time_map = {
            "7h": timedelta(hours=7),
            "24h": timedelta(hours=24),
            "7d": timedelta(days=7),
            "30d": timedelta(days=30),
        }
        time_delta = time_map.get(period, timedelta(hours=7))
        start_time = now() - time_delta

        total_users = User.objects.count()
        active_users = User.objects.filter(is_active=True).count()

        total_pre_registrations = PreRegistration.objects.count()
        pre_registrations_by_status = PreRegistration.objects.values("status").annotate(
            count=Count("id")
        )

        total_admissions = PatientAdmission.objects.count()
        pending_admissions = PatientAdmission.objects.filter(
            discharge_date__isnull=True
        ).count()

        total_notifications = Notification.objects.count()
        notifications_by_status = Notification.objects.values("status").annotate(
            count=Count("id")
        )

        pre_registrations_status_dict = {
            item["status"]: item["count"] for item in pre_registrations_by_status
        }
        notifications_status_dict = {
            item["status"]: item["count"] for item in notifications_by_status
        }

        occupancy_history_qs = OccupancyHistory.objects.filter(
            created_at__gte=start_time
        )
        occupancy_history = OccupancyHistorySerializer(
            occupancy_history_qs, many=True
        ).data

        resource_types_qs = ResourceType.objects.all()
        resource_types = ResourceTypeSerializer(resource_types_qs, many=True).data

        data = {
            "users": {
                "total": total_users,
                "active": active_users,
            },
            "pre_registrations": {
                "total": total_pre_registrations,
                "by_status": pre_registrations_status_dict,
            },
            "admissions": {
                "total": total_admissions,
                "pending": pending_admissions,
            },
            "notifications": {
                "total": total_notifications,
                "by_status": notifications_status_dict,
            },
            "occupancy_history": occupancy_history,
            "resource_types": resource_types,
        }

        return Response(data)
