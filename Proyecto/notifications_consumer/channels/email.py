import json
from json import JSONDecodeError
import logging
from typing import List, Dict, Any, Union

import resend

logger = logging.getLogger(__name__)


class EmailNotification:
    """
    Class for processing notifications for the 'email' channel.
    Expects the content to be a JSON object with the following structure:

    ```json
    {
        "html": "<p>HTML content</p>",
        "text": "Plain text content",  // Optional
        "subject": "Email subject"
    }
    ```
    """

    REQUIRED_KEYS = ["html", "subject"]

    def __init__(self, content: Union[str, Dict[str, str]]):
        """
        Initializes the EmailNotification object.

        Args:
            content: The notification content, either a JSON string or a dictionary.

        Raises:
            ValueError: If the content is not valid JSON or is missing required keys.
        """
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
        self.text: str = content.get("text", "")  # 'text' is optional.  Use .get()
        self.subject: str = content["subject"]

    def send(
        self, recipient_emails: List[str], api_key: str, sender_email: str
    ) -> Dict[str, Any]:
        """
        Sends the email using Resend.

        Args:
            recipient_emails: A list of recipient email addresses.
            api_key: The Resend API key.
            sender_email: Email address of the sender

        Returns:
            The response from the Resend API.  This is typically a dictionary.

        Raises:
            ValueError: if recipient_emails is empty.
            Exception: Re-raises any exceptions from the Resend API.
        """
        if not recipient_emails:
            raise ValueError("recipient_emails cannot be empty")

        params: Dict[str, Any] = {
            "from": sender_email,
            "to": recipient_emails,
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
