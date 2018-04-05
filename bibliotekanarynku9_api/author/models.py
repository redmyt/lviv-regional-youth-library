"""
Module that describes the Author entity which using for describing all
possible author of the library books.
Also describe the language field in AuthorTranslation
for the multilanguage support.
"""

from django.db import models
from utils.language import LANGUAGE_CHOICES


class Author(models.Model):
    """Author entity description"""

    created_at = models.DateTimeField(auto_now_add=True, editable=False)


class AuthorTranslation(models.Model):
    """AuthorTranslation entity description"""

    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    language = models.IntegerField(default=0, choices=LANGUAGE_CHOICES)
    first_name = models.CharField(max_length=30)
    second_name = models.CharField(max_length=30)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = (('author', 'language'),)
