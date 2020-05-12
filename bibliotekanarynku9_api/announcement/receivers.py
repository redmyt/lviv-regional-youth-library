"""
Module that contains all receivers (callbacks) that fire when the appropriate
signal is sent to the system.
"""

import threading

from announcement.googlemybusiness import ANNOUNCEMENT_GOOGLE_MY_BUSINESS_SERVICE
from utils.logger import LOGGER


def synchronize_announcement_translation(sender, user, announcement_translation, **kwargs):
    """
    Receiver that synchronize announcement translation to the Google Business Service.
    Start that process in the background.
    """

    LOGGER.info(
        "Synchronize Announcement Translation to Google Business. "
        f"Arguments: {sender, user, announcement_translation, kwargs}"
    )

    google_business_synchronization = threading.Thread(
        target=ANNOUNCEMENT_GOOGLE_MY_BUSINESS_SERVICE.synchronize_translation_post,
        args=(user, announcement_translation,),
    )
    google_business_synchronization.start()
