"""
Module that describes the Announcement entity which using for describing all
future events that will occur in the library.
Also describe the language field in AnnouncementTranslation
for the multilanguage support.
"""

from django.db import models

from announcement.exceptions import AnnouncementLocationPostDoesNotExist
from link.models import Link
from utils.abstract_model import AbstractModel
from utils.language import LANGUAGE_CHOICES
from utils.logger import LOGGER


class Announcement(AbstractModel):
    """Announcement entity description"""

    avatar = models.CharField(max_length=150)
    start_at = models.DateTimeField()
    end_at = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("start_at",)


class AnnouncementTranslation(AbstractModel):
    """AnnouncementTranslation entity description"""

    announcement = models.ForeignKey(
        Announcement, on_delete=models.CASCADE, related_name="translations"
    )
    title = models.CharField(max_length=256)
    description = models.TextField()
    language = models.IntegerField(default=1, choices=LANGUAGE_CHOICES)
    organizer = models.CharField(max_length=256, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = (("announcement", "language"),)


class AnnouncementTranslationLink(Link):
    """AnnouncementTranslationLink entity description."""

    translation = models.ForeignKey(
        AnnouncementTranslation, on_delete=models.CASCADE, related_name="links"
    )


class AnnouncementGoogleMyBusinessLocationPost(AbstractModel):
    """
    Model that describes relation between the certain AnnouncementTranslation
    instance to the locationPost entity at the Google My Business service.
    Each locationPost at Google Business service is able to have only one language
    code so we bind it with AnnouncementTranslation.
    """

    announcement_translation = models.OneToOneField(
        AnnouncementTranslation, on_delete=models.CASCADE
    )
    service_post_name = models.CharField(max_length=92)
    last_sync_at = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    @classmethod
    def get_by_announcement_translation(cls, translation):
        try:
            return cls.objects.get(announcement_translation=translation)
        except cls.DoesNotExist as err:
            LOGGER.error(
                f"Announcement location post with translation: {translation} doesn't exist. "
                f"Exception: {err}"
            )
            raise AnnouncementLocationPostDoesNotExist

    @classmethod
    def get_by_service_post_name(cls, service_post_name):
        try:
            return cls.objects.get(service_post_name=service_post_name)
        except cls.DoesNotExist as err:
            LOGGER.error(
                f"Announcement location post with name: {service_post_name} doesn't exist. "
                f"Exception: {err}"
            )
            raise AnnouncementLocationPostDoesNotExist
