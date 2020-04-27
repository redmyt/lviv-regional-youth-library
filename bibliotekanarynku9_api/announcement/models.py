"""
Module that describes the Announcement entity which using for describing all
future events that will occur in the library.
Also describe the language field in AnnouncementTranslation
for the multilanguage support.
"""

from django.db import models
from link.models import Link
from utils.abstract_model import AbstractModel
from utils.language import LANGUAGE_CHOICES


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
    service_post_name = models.CharField(max_length=100)
    last_sync_at = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)
