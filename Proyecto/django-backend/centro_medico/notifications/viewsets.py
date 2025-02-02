from rest_framework import mixins, viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Notification
from .serializers import NotificationSerializer


class NotificationViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    """
    This viewset acts as the publisher for notifications.
    It allows creating new notifications (which are stored in the database)
    and listing/retrieving them.
    Note: The status and attempts fields are read-only. Once a notification is sent,
    no modifications are allowed.
    """

    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]
