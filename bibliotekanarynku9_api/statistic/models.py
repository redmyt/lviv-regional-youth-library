"""
Module that describes the site requesting statistic data model.
This model represents the amount of user request per each day.
"""

from django.db import models
from utils.abstract_model import AbstractModel


class DailyRequestStatistic(AbstractModel):
    """Representation of the daily statistic."""

    requests_amount = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('-created_at',)
