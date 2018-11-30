"""
Module that describes the Book entity which using for describing all
books that will use for the bookshelf site view.
Also describe the language field in BookTranslation
for the multilanguage support.
"""

from django.db import models
from utils.abstract_model import AbstractModel
from utils.language import LANGUAGE_CHOICES


class Book(AbstractModel):
    """Book entity description"""

    avatar = models.CharField(max_length=150)
    published_at = models.DateTimeField(null=True)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)


class BookTranslation(AbstractModel):
    """BookTranslation entity description"""

    book = models.ForeignKey(
        Book,
        on_delete=models.CASCADE,
        related_name='translations')
    title = models.CharField(max_length=120)
    language = models.IntegerField(default=1, choices=LANGUAGE_CHOICES)
    description = models.CharField(max_length=4096)
    author = models.CharField(max_length=120)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = (('book', 'language'),)
