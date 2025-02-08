import json
from json import JSONDecodeError
import logging
from typing import List, Dict, Any, Union
import resend
from .base import NotificationChannelStrategy


logger = logging.getLogger(__name__)


class EmailNotificationStrategy(NotificationChannelStrategy):
    """
    Class for processing notifications for the 'email' channel.
    """

    REQUIRED_KEYS = ["html", "subject"]

    def __init__(self, content: Union[str, Dict[str, str]]):
        if isinstance(content, str):
            try:
                content = json.loads(content)
            except JSONDecodeError as e:
                raise ValueError(f"Content is not valid JSON: {e}") from e
        if not isinstance(content, dict):
            raise ValueError("Content must be a JSON object (dict).")

        missing = [key for key in self.REQUIRED_KEYS if key not in content]
        if missing:
            raise ValueError(f"Missing keys in email content: {missing}")

        self.html: str = content["html"]
        self.text: str = content.get("text", "")
        self.subject: str = content["subject"]

    def send(
        self, recipient_identifiers: List[str], config: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Sends the email using Resend."""

        if not recipient_identifiers:
            raise ValueError("recipient_emails cannot be empty")

        api_key = config.get("api_key")
        sender_email = config.get("sender_email")

        if not api_key or not sender_email:
            raise ValueError(
                "API key and sender email are required for email notifications."
            )

        params: Dict[str, Any] = {
            "from": sender_email,
            "to": recipient_identifiers,
            "subject": self.subject,
            "html": self.html,
        }
        if self.text:
            params["text"] = self.text

        resend.api_key = api_key

        try:
            response: Dict[str, Any] = resend.Emails.send(params)
            return response
        except Exception as e:
            logger.exception("Error sending email via Resend: %s", e)
            raise  # Re-raise the exception to be handled by the caller.
