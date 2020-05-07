"""
Module that contains the variety of converters that could be used to convert the
default django models types to data structures that used at other (third-party) services.
"""

# pylint: disable=C0330
# (Wrong hanging indentation before block) it's a known pylint issue.
# It is caused by Black file formatter in this case

# TODO Change to Typing when will move to Python 3.8
from typing_extensions import TypedDict

from announcement.models import AnnouncementTranslation
from utils.handlers import IMAGE_HANDLER


# TODO: Replace hardcoded code with Language Enum (also should be used at models)
DEFAULT_LANGUAGE_CODE = "uk"
DEFAULT_MEDIA_FORMAT = "PHOTO"

# Data Structures
TIME = TypedDict("TIME", {"hours": int, "minutes": int, "seconds": int, "nanos": int})
DAY = TypedDict("DAY", {"year": int, "month": int, "day": int})
TIME_INTERVAL = TypedDict(
    "TIME_INTERVAL", {"startDate": DAY, "startTime": TIME, "endDate": DAY, "endTime": TIME}
)
EVENT = TypedDict("EVENT", {"title": str, "schedule": TIME_INTERVAL})
MEDIA = TypedDict("MEDIA", {"mediaFormat": str, "sourceUrl": str})
LOCATION_POST = TypedDict(
    "LOCATION_POST", {"languageCode": str, "summary": str, "event": EVENT, "media": MEDIA}
)


class AnnouncementTranslationLocationPostConverter:
    """
    Converter for the flexible exchanging the AnnounceTranslation model instance to
    Google My Business LocationPost object.
    """

    @classmethod
    def translation_to_location_post(cls, translation: AnnouncementTranslation) -> LOCATION_POST:
        """
        Method that converts the accepted Announce translation instance to
        the Google My Business locationPost data structure.
        """

        return {
            "languageCode": DEFAULT_LANGUAGE_CODE,
            "summary": translation.description,
            "event": cls.__create_google_business_event(translation),
            "media": cls.__create_google_business_media(translation),
        }

    @classmethod
    def location_post_to_translation(cls, location_post: LOCATION_POST) -> AnnouncementTranslation:
        """
        Method that converts the accepted Google My Business LocationPost object
        to the regular AnnouncementTranslation model instance.
        Should be implemented when needed.
        """

        raise NotImplementedError

    @classmethod
    def __create_google_business_event(cls, translation: AnnouncementTranslation) -> EVENT:
        """
        Method creates the Google My Business EVENT object
        from accepted AnnouncementTranslation instance.
        """

        return {
            "title": translation.title,
            "schedule": cls.__create_google_business_time_interval(translation),
        }

    @staticmethod
    def __create_google_business_time_interval(
        translation: AnnouncementTranslation,
    ) -> TIME_INTERVAL:
        """
        Method creates Google My Business TIME_INTERVAL object
        from accepted AnnouncementTranslation instance.
        """

        return {
            "startDate": {
                "year": translation.announcement.start_at.year,
                "month": translation.announcement.start_at.month,
                "day": translation.announcement.start_at.day,
            },
            "startTime": {
                "hours": translation.announcement.start_at.hour,
                "minutes": translation.announcement.start_at.minute,
                "seconds": translation.announcement.start_at.second,
                "nanos": translation.announcement.start_at.microsecond,
            },
            "endDate": {
                "year": translation.announcement.end_at.year,
                "month": translation.announcement.end_at.month,
                "day": translation.announcement.end_at.day,
            },
            "endTime": {
                "hours": translation.announcement.end_at.hour,
                "minutes": translation.announcement.end_at.minute,
                "seconds": translation.announcement.end_at.second,
                "nanos": translation.announcement.end_at.microsecond,
            },
        }

    @staticmethod
    def __create_google_business_media(translation: AnnouncementTranslation) -> MEDIA:
        """
        Method creates the Google My Business MEDIA object
        from accepted AnnouncementTranslation instance.
        """

        avatar = IMAGE_HANDLER.get_public_image_path(translation.announcement.avatar)
        return {
            "mediaFormat": DEFAULT_MEDIA_FORMAT,
            "sourceUrl": avatar,
        }
