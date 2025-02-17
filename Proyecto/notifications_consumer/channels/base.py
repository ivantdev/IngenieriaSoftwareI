from abc import ABC, abstractmethod
from typing import List, Dict, Any


class NotificationChannelStrategy(ABC):
    """
    Abstract base class for notification channels (Strategy interface).
    """

    @abstractmethod
    def send(
        self, recipient_identifiers: List[str], config: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Sends a notification.

        Args:
            recipient_identifiers: List of recipient identifiers (emails, phone numbers, etc.).
            config: A dictionary of configuration parameters (API key, sender ID, etc.).

        Returns:
            Response from the notification service.

        Raises:
            Exception: If sending fails.
        """
        pass
