from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Notification

User = get_user_model()


class NotificationSerializer(serializers.ModelSerializer):
    recipients = serializers.PrimaryKeyRelatedField(
        many=True, queryset=User.objects.all()
    )

    class Meta:
        model = Notification
        fields = [
            "id",
            "recipients",
            "channel",
            "content",
            "title",
            "attempts",
            "status",
            "created_at",
        ]
        read_only_fields = ["id", "attempts", "status", "created_at"]

    def update(self, instance, validated_data):
        if instance.status == "sent":
            raise serializers.ValidationError(
                "Cannot modify a notification that has already been sent."
            )

        validated_data.pop("status", None)
        validated_data.pop("attempts", None)
        return super().update(instance, validated_data)
