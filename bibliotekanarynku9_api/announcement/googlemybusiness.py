"""
Module that contains basic logic that binds the announcement app entities with
Google My Business service's.
"""

import datetime

from announcement.converters import AnnouncementTranslationLocationPostConverter
from announcement.models import AnnouncementTranslation, AnnouncementGoogleMyBusinessLocationPost
from customuser.models import CustomUser
from googlemybusiness.service import GOOGLE_MY_BUSINESS_API_SERVICE
from utils.logger import LOGGER


class AnnouncementGoogleMyBusinessService:
    """
    Service for synchronization of AnnouncementTranslation entities to the Google
    Business service. This service provides some facilitation methods that helps
    to check synchronization status of translation post.
    """

    __TRANSLATION_LOCATION_POST_CONVERTER = AnnouncementTranslationLocationPostConverter()

    def __init__(self):
        self.api_service = GOOGLE_MY_BUSINESS_API_SERVICE

    def create_location_post(self, user, translation):
        """
        Method that creates locationPost at Google Business service.
        :param user: current session user
        :param translation: AnnouncementTranslation instance that should be synced.
        :return: synced AnnouncementTranslation instance.
        """

        location_post = self.__TRANSLATION_LOCATION_POST_CONVERTER.translation_to_location_post(
            translation
        )
        created_location_post = self.api_service.create_post(user, location_post)
        if not created_location_post:
            LOGGER.error(
                "Filed to create locationPost during the announcement translation synchronization."
            )
            return None

        synced_translation_post = AnnouncementGoogleMyBusinessLocationPost.create(
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
            return None

        return synced_translation_post

    # TODO: Need to implement
    # def update_location_post(self, user, translation):

    # TODO: Need to implement
    # def delete_location_post(self, user, translation):

    def synchronize_translation_post(self, user: CustomUser, translation: AnnouncementTranslation):
        """
        General method that creates or updates translation if it need to be synced.
        :param user: current session user.
        :param translation: AnnouncementTranslation instance that need to be synced.
        :return: synced AnnouncementTranslation instance.
        """

        synced_post = AnnouncementGoogleMyBusinessLocationPost.get_by_id(translation.id)
        if not synced_post:
            synced_post = self.create_location_post(user, translation)
        return synced_post

    # TODO: Need to implement
    # def get_synchronization_status


ANNOUNCEMENT_GOOGLE_MY_BUSINESS_SERVICE = AnnouncementGoogleMyBusinessService()
