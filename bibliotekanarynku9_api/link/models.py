"""
Module that describes the Link entity which using for describing all
links which can be related with many types of entities like posts, books,
announcements etc.
"""

from django.db import models

class Link(models.Model):
    """Link entity description"""

    label = models.CharField(max_length=150)
    href = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)
