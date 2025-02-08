from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Notification(models.Model):
    CHANNEL_CHOICES = [
        ("email", "Email"),
        ("mobile", "Mobile"),
        ("whatsapp", "Whatsapp"),
    ]

    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("sent", "Sent"),
        ("failed", "Failed"),
        ("invalid", "Invalid"),
    ]

    recipients = models.ManyToManyField(
        User, related_name="notifications", verbose_name="Recipients"
    )
    channel = models.CharField(
        max_length=20, choices=CHANNEL_CHOICES, verbose_name="Channel"
    )
    content = models.JSONField(verbose_name="Content")
    title = models.CharField(max_length=255, verbose_name="Title")
    attempts = models.PositiveIntegerField(default=0, verbose_name="Attempts")

    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default="pending", verbose_name="Status"
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")

    class Meta:
        verbose_name = "Notification"
        verbose_name_plural = "Notifications"

    def __str__(self):
        recipients_list = ", ".join([str(user) for user in self.recipients.all()])
        return f"Notification to [{recipients_list}] - {self.title}"

    def get_recipient_identifiers(self):
        """
        Returns a list of recipient identifiers based on the notification channel.
        """
        if self.channel == "email":
            return [user.email for user in self.recipients.all() if user.email]
        elif self.channel == "whatsapp":
            return [
                user.phone_number for user in self.recipients.all() if user.phone_number
            ]
        # add more channels here
        else:
            return []
