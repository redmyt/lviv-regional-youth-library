"""
Module that contains the variety of converters that could be used to convert the
default django models types to data structures that used at other (third-party) services.
"""

from utils.handlers import IMAGE_HANDLER


# TODO: Replace hardcoded code with Language Enum (also should be used at models)
DEFAULT_LANGUAGE_CODE = "uk"
DEFAULT_MEDIA_FORMAT = "PHOTO"


def convert_translation_to_location_post(translation):
    """
    Method that converts the accepted Announce translation instance to
    the Google My Business locationPost data structure.
    """

    return {
        "languageCode": DEFAULT_LANGUAGE_CODE,
        "summary": translation.description,
        "event": __create_google_business_event(translation),
        "media": __create_google_business_media(translation),
    }


def __create_google_business_event(translation):
    """
    Method creates the Google My Business Event object
    from accepted AnnouncementTranslation instance.
    """

    return {
        "title": translation.title,
        "schedule": __create_google_business_time_interval(translation),
    }


def __create_google_business_time_interval(translation):
    """
    Method creates Google My Business TimeInterval object
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


def __create_google_business_media(translation):
    """
    Method creates the Google My Business Media object
    from accepted AnnouncementTranslation instance.
    """

    avatar = IMAGE_HANDLER.get_public_image_path(translation.announcement.avatar)
    return {
        "mediaFormat": DEFAULT_MEDIA_FORMAT,
        "sourceUrl": avatar,
    }
