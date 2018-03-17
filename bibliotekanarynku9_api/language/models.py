"""
Module that describes the Language entity which using for implementation
of multilanguage support for other project entities.
The translation implements with using OneToOne relation to the Language model
"""

from django.db import models


class Language(models.Model):
    """Language entity description"""

    name = models.CharField(max_length=20)
    code = models.CharField(max_length=3)
