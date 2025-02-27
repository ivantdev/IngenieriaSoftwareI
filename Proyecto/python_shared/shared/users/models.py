from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    phone = models.CharField("Phone number", max_length=15, blank=True, null=True)
    telegram_id = models.CharField("Telegram ID", max_length=50, blank=True, null=True)
