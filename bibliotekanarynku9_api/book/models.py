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
    published_at = models.DateField(null=True)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('-created_at',)


class BookTranslation(AbstractModel):
    """BookTranslation entity description"""

    book = models.ForeignKey(
        Book,
        on_delete=models.CASCADE,
        related_name='translations')
    title = models.CharField(max_length=256)
    language = models.IntegerField(default=1, choices=LANGUAGE_CHOICES)
    description = models.TextField()
    author = models.CharField(max_length=256)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = (('book', 'language'),)
