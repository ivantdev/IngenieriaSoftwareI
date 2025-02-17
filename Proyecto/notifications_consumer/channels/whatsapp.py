import logging
from typing import List, Dict, Any
from .base import NotificationChannelStrategy


logger = logging.getLogger(__name__)


class WhatsAppNotificationStrategy(NotificationChannelStrategy):
    """
    Class for processing notifications for the 'whatsapp' channel.
    """

    def __init__(self, content: Dict[str, Any]):
        self.content = content

    def send(
        self, recipient_identifiers: List[str], config: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Sends a WhatsApp notification."""

        api_key = config.get("api_key")
        sender_phone_number = config.get("sender_phone_number")

        if not api_key or not sender_phone_number:
            raise ValueError(
                "API key and sender phone number are required for WhatsApp notifications."
            )

        logger.info(
            "Sending WhatsApp notification (not implemented). API Key: %s, Sender: %s",
            api_key,
            sender_phone_number,
        )
        # Here would go the actual logic for sending a WhatsApp message (using an API, e.g., Twilio)
        return {"status": "not_implemented", "api_key_used": api_key}
