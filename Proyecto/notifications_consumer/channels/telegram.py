import json
import requests
import logging
from json import JSONDecodeError
from typing import List, Dict, Any, Union
from .base import NotificationChannelStrategy

logger = logging.getLogger(__name__)


class TelegramNotificationStrategy(NotificationChannelStrategy):
    """
    Class for processing notifications for the 'telegram' channel.
    """

    REQUIRED_KEYS = ["text"]

    def __init__(self, content: Union[str, Dict[str, Any]]):
        if isinstance(content, str):
            try:
                content = json.loads(content)
            except JSONDecodeError as e:
                raise ValueError(f"Content is not valid JSON: {e}") from e
        if not isinstance(content, dict):
            raise ValueError("Content must be a JSON object (dict).")

        missing = [key for key in self.REQUIRED_KEYS if key not in content]
        if missing:
            raise ValueError(f"Missing keys in telegram content: {missing}")

        self.text: str = content["text"]
        self.parse_mode: Union[str, None] = content.get(
            "parse_mode", None
        )  # HTML or markdown

    def send(
        self, recipient_identifiers: List[str], config: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Send the message using the Telegram Bot API.
        ## Arguments
        - recipient_identifiers: list of chat_id to send the message to.
        - config: dictionary that must include the bot's API
        """
        if not recipient_identifiers:
            raise ValueError("recipient_identifiers can't be empty")

        bot_token = config.get("bot_token")
        if not bot_token:
            raise ValueError("The API key is required for Telegram notifications.")

        url_template = f"https://api.telegram.org/bot{bot_token}/sendMessage"
        responses = {}

        for chat_id in recipient_identifiers:
            payload: Dict[str, Any] = {
                "chat_id": chat_id,
                "text": self.text,
            }
            if self.parse_mode:
                payload["parse_mode"] = self.parse_mode

            try:
                response = requests.post(url_template, data=payload)
                response.raise_for_status()
                responses[chat_id] = response.json()
            except Exception as e:
                logger.exception("Error sending telegram message %s: %s", chat_id, e)
                raise

        return responses
