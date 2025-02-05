# shared/notifications/apps.py
from django.apps import AppConfig


class SharedNotificationsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "shared.notifications"
    label = "shared_notifications"
