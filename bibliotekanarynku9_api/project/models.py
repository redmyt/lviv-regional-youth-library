"""
Module that describes the Project entity which using for describing all
projects that was occurred in the library.
Also describe the language field in ProjectTranslation
for the multilanguage support.
"""

from django.db import models
from link.models import Link
from utils.abstract_model import AbstractModel
from utils.language import LANGUAGE_CHOICES


class Project(AbstractModel):
    """Project entity description."""

    avatar = models.CharField(max_length=150)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('created_at',)


class ProjectTranslation(AbstractModel):
    """ProjectTranslation entity description."""

    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='translations')
    language = models.IntegerField(default=1, choices=LANGUAGE_CHOICES)
    title = models.CharField(max_length=256)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = (('project', 'language'),)


class ProjectTranslationLink(Link):
    """ProjectTranslationLink entity description."""

    translation = models.ForeignKey(
        ProjectTranslation,
        on_delete=models.CASCADE,
        related_name='links')
