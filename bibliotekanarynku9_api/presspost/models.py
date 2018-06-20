"""
Module that describes the PressPost entity which using for describing all
press mentions of library events.
Also describe the language field in PressPostTranslation
for the multilanguage support.
"""

from django.db import models
from link.models import Link
from utils.abstract_model import AbstractModel
from utils.language import LANGUAGE_CHOICES


class PressPost(AbstractModel):
    """PressPost entity description"""

    avatar = models.CharField(max_length=150)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)


class PressPostTranslation(AbstractModel):
    """PressPostTranslation entity description"""

    post = models.ForeignKey(
        PressPost,
        on_delete=models.CASCADE,
        related_name='translations')
    title = models.CharField(max_length=120)
    language = models.IntegerField(default=1, choices=LANGUAGE_CHOICES)
    description = models.CharField(max_length=512)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = (('post', 'language'),)


class PressPostTranslationLink(Link):
    """PressPostTranslationLink entity description."""

    translation = models.ForeignKey(
        PressPostTranslation,
        on_delete=models.CASCADE,
        related_name='links')
