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
    start_at = models.DateTimeField(null=True)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)


class AnnouncementTranslation(AbstractModel):
    """AnnouncementTranslation entity description"""

    announcement = models.ForeignKey(
        Announcement,
        on_delete=models.CASCADE,
        related_name='translations')
    title = models.CharField(max_length=120)
    description = models.CharField(max_length=512)
    language = models.IntegerField(default=1, choices=LANGUAGE_CHOICES)
    organizer = models.CharField(max_length=120, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = (('announcement', 'language'),)


class AnnouncementTranslationLink(Link):
    """AnnouncementTranslationLink entity description."""

    translation = models.ForeignKey(
        AnnouncementTranslation,
        on_delete=models.CASCADE,
        related_name='links')
