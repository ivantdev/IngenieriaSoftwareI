"""
Consumer script for processing notifications.
This script uses the Django ORM to query notifications from the shared model and process them.
It uses Resend for sending emails.
The channel-specific logic is separated into different modules under the 'channels' package.
"""

import os
import sys
import time
import django
import logging
import environ
from channels.email import EmailNotification
from pathlib import Path
from django.db.models.query import QuerySet
from typing import List, Dict, Any, Optional, NoReturn


BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR / "python_shared"))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "settings")
django.setup()

from shared.notifications.models import (  # noqa: E402 // import after django.setup()
    Notification,
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(message)s",
)


# Logger
logger = logging.getLogger(__name__)
env = environ.Env(DEBUG=(bool, False))
environ.Env.read_env(os.path.join(BASE_DIR, ".env"))


# Configure Resend API key
RESEND_API_KEY: Optional[str] = os.environ.get("RESEND_API_KEY")
if not RESEND_API_KEY:
    logger.error("RESEND_API_KEY is not set in the environment variables.")
    sys.exit(1)


# Configure domain for email sender
APP_DOMAIN: Optional[str] = os.environ.get("APP_DOMAIN")
if not APP_DOMAIN:
    logger.error("APP_DOMAIN is not set in the environment variables.")
    sys.exit(1)


def process_notification(notification: Notification) -> bool:
    """
    Processes a notification based on its channel.
    - Tries to instantiate the corresponding channel-specific object.
    - If validation fails, marks the notification as invalid.
    - If successful, attempts to send the notification.
    """

    recipient_emails: List[str] = [
        user.email for user in notification.recipients.all() if user.email
    ]

    if notification.channel == "email":
        try:
            email_notification = EmailNotification(notification.content)
        except ValueError as ve:
            logger.error("Notification %s invalid: %s", notification.id, ve)
            notification.status = "invalid"
            notification.save()
            return False

        if not recipient_emails:
            logger.error(
                "Notification %s has no valid recipient emails.", notification.id
            )
            notification.status = "invalid"
            notification.save()
            return False

        try:
            response: Dict[str, Any] = email_notification.send(
                recipient_emails=recipient_emails,
                api_key=RESEND_API_KEY,
                sender_email=f"notifications-no-reply@{APP_DOMAIN}",
            )
            logger.info(
                "Resend response for notification %s: %s", notification.id, response
            )
            return True
        except Exception as e:
            logger.error(
                "Error sending email for notification %s: %s", notification.id, e
            )
            return False

    elif notification.channel == "whatsapp":
        logger.info(
            "WhatsApp channel processing not implemented for notification %s.",
            notification.id,
        )
        return False

    else:
        logger.error(
            "Unknown channel for notification %s: %s",
            notification.id,
            notification.channel,
        )
        return False


def consumer_loop(
    poll_interval: int = 10,
) -> NoReturn:
    """
    Main loop of the consumer.
    Queries notifications with status "pending" and attempts less than 5,
    processes them, and if a notification reaches 5 attempts, marks it as "failed".
    """
    while True:
        logger.info("Checking for pending notifications with less than 5 attempts...")

        pending_notifications: QuerySet[Notification] = Notification.objects.filter(
            status="pending", attempts__lt=5
        )

        for notification in pending_notifications:
            notification.attempts += 1
            try:
                success: bool = process_notification(notification)
                if success:
                    notification.status = "sent"
                    logger.info("Notification %s sent successfully.", notification.id)
                elif notification.attempts >= 5:
                    logger.error(
                        "Notification %s reached 5 attempts. Marking as failed.",
                        notification.id,
                    )
                    notification.status = "failed"

            except Exception as e:
                logger.exception(
                    "Error processing notification %s: %s", notification.id, e
                )
                if notification.attempts >= 5:
                    logger.error(
                        "Notification %s reached 5 attempts due to error. Marking as failed.",
                        notification.id,
                    )
                    notification.status = "failed"
            finally:
                notification.save()

        time.sleep(poll_interval)


if __name__ == "__main__":
    try:
        consumer_loop(poll_interval=10)
    except KeyboardInterrupt:
        logger.info("Consumer stopped manually.")
