"""
Module that describes the PressPost entity which using for describing all
press mentions of library events.
Also describe the language field in PressPostTranslation
for the multilanguage support.
"""

from django.db import models
from link.models import Link
from utils.language import LANGUAGE_CHOICES


class PressPost(models.Model):
    """PressPost entity description"""

    avatar = models.CharField(max_length=150)
    links = models.ManyToManyField(Link)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)


class PressPostTranslation(models.Model):
    """PressPostTranslation entity description"""

    post = models.ForeignKey(PressPost, on_delete=models.CASCADE)
    title = models.CharField(max_length=120)
    language = models.IntegerField(default=0, choices=LANGUAGE_CHOICES)
    description = models.CharField(max_length=512)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = (('post', 'language'),)
