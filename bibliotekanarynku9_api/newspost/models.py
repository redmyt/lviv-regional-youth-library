"""
Module that describes the NewsPost entity which using for describing all
news that was occurred in the library.
Also describe the language field in NewsPostTranslation
for the multilanguage support.
"""

from django.db import models
from link.models import Link
from utils.abstract_model import AbstractModel
from utils.language import LANGUAGE_CHOICES


class NewsPost(AbstractModel):
    """NewsPost entity description."""

    avatar = models.CharField(max_length=150)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)

    class Meta:
        ordering = ('-created_at',)


class NewsPostTranslation(AbstractModel):
    """NewsPostTranslation entity description."""

    post = models.ForeignKey(
        NewsPost,
        on_delete=models.CASCADE,
        related_name='translations')
    title = models.CharField(max_length=120)
    language = models.IntegerField(default=1, choices=LANGUAGE_CHOICES)
    description = models.CharField(max_length=2048)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = (('post', 'language'),)


class NewsPostTranslationLink(Link):
    """NewsPostTranslationLink entity description."""

    translation = models.ForeignKey(
        NewsPostTranslation,
        on_delete=models.CASCADE,
        related_name='links')
