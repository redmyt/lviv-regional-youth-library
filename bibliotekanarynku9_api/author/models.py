"""
Module that describes the Author entity which using for describing all
possible author of the library books.
Also describe the language field in AuthorTranslation
for the multilanguage support.
"""

from django.db import models
from utils.abstract_model import AbstractModel
from utils.language import LANGUAGE_CHOICES


class Author(AbstractModel):
    """Author entity description"""

    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)


class AuthorTranslation(AbstractModel):
    """AuthorTranslation entity description"""

    author = models.ForeignKey(
        Author,
        on_delete=models.CASCADE,
        related_name='translations')
    language = models.IntegerField(default=1, choices=LANGUAGE_CHOICES)
    first_name = models.CharField(max_length=30)
    second_name = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = (('author', 'language'),)
