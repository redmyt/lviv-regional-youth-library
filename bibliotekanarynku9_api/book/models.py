"""
Module that describes the Book entity which using for describing all
books that will use for the bookshelf site view.
Also describe the language field in BookTranslation
for the multilanguage support.
"""

from django.db import models
from author.models import Author
from utils.language import LANGUAGE_CHOICES


class Book(models.Model):
    """Book entity description"""

    authors = models.ManyToManyField(Author)
    avatar = models.CharField(max_length=150)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    published_at = models.DateTimeField(null=True)


class BookTranslation(models.Model):
    """BookTranslation entity description"""

    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    title = models.CharField(max_length=120)
    language = models.IntegerField(default=1, choices=LANGUAGE_CHOICES)
    description = models.CharField(max_length=4096)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = (('book', 'language'),)
