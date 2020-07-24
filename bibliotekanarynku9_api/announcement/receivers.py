"""
Module that contains all receivers (callbacks) that fire when the appropriate
signal is sent to the system.
"""

import threading

from announcement.googlemybusiness import ANNOUNCEMENT_GOOGLE_MY_BUSINESS_SERVICE
from utils.logger import LOGGER


def synchronize_announcement_translation(sender, instance, **kwargs):
    """
    Receiver that synchronize announcement translation to the Google Business Service.
    Start that process in the background.
    """

    LOGGER.debug(
        "Synchronize Announcement Translation to Google Business. "
        f"Arguments: {sender, instance, kwargs}"
    )

    google_business_synchronization = threading.Thread(
        target=ANNOUNCEMENT_GOOGLE_MY_BUSINESS_SERVICE.synchronize_translation_post,
        args=(instance,),
    )
    google_business_synchronization.start()
