from django.apps import AppConfig


class SharedUsersConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "shared.users"
    label = "shared_users"
