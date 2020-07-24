"""
Module that contains basic logic that binds the announcement app entities with
Google My Business service.
"""

import datetime

from announcement.converters import AnnouncementTranslationLocationPostConverter
from announcement.exceptions import AnnouncementLocationPostDoesNotExist
from announcement.models import AnnouncementTranslation, AnnouncementGoogleMyBusinessLocationPost
from googlemybusiness.googlemybusiness import GOOGLE_MY_BUSINESS_API_SERVICE
from utils.logger import LOGGER


class AnnouncementGoogleMyBusinessService:
    """
    Service for synchronization of AnnouncementTranslation entities to the Google
    Business service. This service provides some facilitation methods that helps
    to check synchronization status of translation post.
    """

    _TRANSLATION_LOCATION_POST_CONVERTER = AnnouncementTranslationLocationPostConverter()

    def __init__(self):
        self.api_service = GOOGLE_MY_BUSINESS_API_SERVICE
        self.translation_posts = AnnouncementGoogleMyBusinessLocationPost

    def create_location_post(self, translation):
        """
        Method that creates locationPost at Google Business service.
        :param translation: AnnouncementTranslation instance that should be synced.
        :return: synced AnnouncementTranslation instance.
        """
        location_post = self._TRANSLATION_LOCATION_POST_CONVERTER.translation_to_location_post(
            translation
        )
        created_location_post = self.api_service.create_post(location_post)
        synced_translation_post = self.translation_posts.create(
            {
                "announcement_translation": translation,
                "service_post_name": created_location_post["name"],
                "last_sync_at": datetime.datetime.now(tz=datetime.timezone.utc),
            }
        )
        if not synced_translation_post:
            LOGGER.error(
                "Filed to create announcement synced post "
                "database record translation synchronization."
            )
        return synced_translation_post

    def synchronize_translation_post(self, translation: AnnouncementTranslation):
        """
        General method that creates or updates translation if it need to be synced.
        :param translation: AnnouncementTranslation instance that need to be synced.
        :return: synced AnnouncementTranslation instance.
        """
        try:
            synced_post = self.translation_posts.get_by_announcement_translation(translation)
        except AnnouncementLocationPostDoesNotExist:
            synced_post = self.create_location_post(translation)
        return synced_post

    # TODO: Need to implement
    # def update_location_post(self, translation):

    # TODO: Need to implement
    # def delete_location_post(self, translation):

    # TODO: Need to implement
    # def get_synchronization_status


ANNOUNCEMENT_GOOGLE_MY_BUSINESS_SERVICE = AnnouncementGoogleMyBusinessService()
