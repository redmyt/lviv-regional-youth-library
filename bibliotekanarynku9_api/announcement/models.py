"""
Module that describes the Announcement entity which using for describing all
future events that will occur in the library.
Also describe the language field in AnnouncementTranslation
for the multilanguage support.
"""

from django.db import models
from utils.language import LANGUAGE_CHOICES


class Announcement(models.Model):
    """Announcement entity description"""

    avatar = models.CharField(max_length=150)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    start_at = models.DateField(null=True)


class AnnouncementTranslation(models.Model):
    """AnnouncementTranslation entity description"""

    announcement = models.ForeignKey(Announcement, on_delete=models.CASCADE)
    title = models.CharField(max_length=120)
    language = models.IntegerField(default=0, choices=LANGUAGE_CHOICES)
    description = models.CharField(max_length=512)
    organizer = models.CharField(max_length=120, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = (('announcement', 'language'),)
