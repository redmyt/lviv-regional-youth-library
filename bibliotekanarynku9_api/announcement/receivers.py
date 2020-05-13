"""
Module that contains all receivers (callbacks) that fire when the appropriate
signal is sent to the system.
"""

# pylint: disable=C0330
# (Wrong hanging indentation before block) it's a known pylint issue.
# It is caused by Black file formatter in this case

import threading

from announcement.googlemybusiness import ANNOUNCEMENT_GOOGLE_MY_BUSINESS_SERVICE
from announcement.models import AnnouncementTranslation
from utils.logger import LOGGER


def synchronize_announcement_translation(sender, user, announcement_translation, **kwargs):
    """
    Receiver that synchronize announcement translation to the Google Business Service.
    Start that process in the background.
    """

    LOGGER.debug(
        "Synchronize Announcement Translation to Google Business. "
        f"Arguments: {sender, user, announcement_translation, kwargs}"
    )

    google_business_synchronization = threading.Thread(
        target=ANNOUNCEMENT_GOOGLE_MY_BUSINESS_SERVICE.synchronize_translation_post,
        args=(user, announcement_translation,),
    )
    google_business_synchronization.start()


def remove_announcement_translation(
    sender,
    user,
    announcement_translation: AnnouncementTranslation,
    google_business_post_name: str,
    **kwargs,
):
    """
    Receiver that removes location post at the Google Business Service.
    Start that process in the background.
    """

    LOGGER.debug(
        "Delete Google Business location post of removed Announcement Translation instance."
        f"Arguments: {sender, user, announcement_translation, kwargs}"
    )

    google_business_post_deletion = threading.Thread(
        target=ANNOUNCEMENT_GOOGLE_MY_BUSINESS_SERVICE.delete_location_post,
        args=(user, google_business_post_name,),
    )
    google_business_post_deletion.start()
