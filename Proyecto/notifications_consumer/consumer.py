import os
import sys
import time
import django
import logging
import environ
from channels.email import EmailNotificationStrategy
from channels.whatsapp import WhatsAppNotificationStrategy
from channels.base import NotificationChannelStrategy
from pathlib import Path
from django.db.models.query import QuerySet
from typing import List, Dict, Any, Optional, NoReturn, Type


BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR / "python_shared"))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "settings")
django.setup()

from shared.notifications.models import Notification  # noqa: E402


class Consumer:
    """
    Consumes notifications from the database and dispatches them to the
    appropriate channel.
    """

    def __init__(self, poll_interval: int = 10):
        self.poll_interval = poll_interval
        self.logger = logging.getLogger(__name__)
        self.env = environ.Env(DEBUG=(bool, False))
        self.env.read_env(os.path.join(BASE_DIR, ".env"))

        self.channel_config: Dict[str, Dict[str, Any]] = {
            "email": {
                "api_key": self.env("EMAIL_API_KEY"),
                "sender_email": self.env("EMAIL_SENDER"),
            },
            "whatsapp": {
                "api_key": self.env("WHATSAPP_API_KEY"),
                "sender_phone_number": self.env("WHATSAPP_SENDER"),
            },
            # Add more settings by channel here...
        }

        self.channel_strategies: Dict[str, Type[NotificationChannelStrategy]] = {
            "email": EmailNotificationStrategy,
            "whatsapp": WhatsAppNotificationStrategy,
            # Add more strategies here...
        }

        self._validate_config()

    def _validate_config(self) -> None:
        """Validates that all channels have their required configuration."""
        for channel, config in self.channel_config.items():
            missing_vars = [
                key for key, value in config.items() if value is None or value == ""
            ]
            if missing_vars:
                self.logger.error(
                    "Missing required configuration for channel %s: %s",
                    channel,
                    ", ".join(missing_vars),
                )
                sys.exit(1)

    def get_channel_strategy(
        self, channel_name: str
    ) -> Optional[Type[NotificationChannelStrategy]]:
        """Retrieves the strategy."""
        return self.channel_strategies.get(channel_name)

    def process_notification(self, notification: Notification) -> bool:
        """Processes a single notification."""

        recipient_identifiers: List[str] = notification.get_recipient_identifiers()
        strategy_class: Optional[Type[NotificationChannelStrategy]] = (
            self.get_channel_strategy(notification.channel)
        )

        if strategy_class is None:
            self.logger.error("Unknown channel: %s", notification.channel)
            notification.status = "invalid"
            notification.save()
            return False

        try:
            channel_sender: NotificationChannelStrategy = strategy_class(
                notification.content
            )
        except ValueError as e:
            self.logger.error("Notification %s invalid: %s", notification.id, e)
            notification.status = "invalid"
            notification.save()
            return False

        if not recipient_identifiers:
            self.logger.error(
                "Notification %s has no valid recipient identifiers", notification.id
            )
            notification.status = "invalid"
            notification.save()
            return False

        channel_config = self.channel_config.get(notification.channel)
        if channel_config is None:
            self.logger.error(
                "No configuration found for channel: %s", notification.channel
            )
            notification.status = "invalid"
            notification.save()
            return False

        try:
            response = channel_sender.send(recipient_identifiers, channel_config)
            self.logger.info(
                "Response for notification %s: %s", notification.id, response
            )
            return True
        except Exception as e:
            self.logger.exception(
                "Error sending notification %s: %s", notification.id, e
            )
            return False

    def run(self) -> NoReturn:
        """Main consumer loop."""
        while True:
            self.logger.info("Checking for pending notifications...")
            pending_notifications: QuerySet[Notification] = Notification.objects.filter(
                status="pending", attempts__lt=5
            )

            for notification in pending_notifications:
                notification.attempts += 1
                try:
                    success = self.process_notification(notification)
                    if success:
                        notification.status = "sent"
                    elif notification.attempts >= 5:
                        self.logger.error(
                            "Notification %s reached 5 attempts. Marking as failed.",
                            notification.id,
                        )
                        notification.status = "failed"
                except Exception:
                    self.logger.exception(
                        "Error processing notification %s", notification.id
                    )
                    if notification.attempts >= 5:
                        self.logger.error(
                            "Notification %s reached 5 attempts. Marking as failed.",
                            notification.id,
                        )
                        notification.status = "failed"
                finally:
                    notification.save()

            time.sleep(self.poll_interval)


if __name__ == "__main__":
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s %(levelname)s %(message)s",
    )
    consumer = Consumer()
    try:
        consumer.run()
    except KeyboardInterrupt:
        logging.info("Consumer stopped manually.")
