"""
Module that describes the serializers for the DailyRequestStatistic model.
"""

from rest_framework import serializers
from statistic.models import DailyRequestStatistic


class DailyRequestStatisticSerializer(serializers.ModelSerializer):
    """DailyRequestStatisticSerializer model serializer"""

    class Meta:
        """Meta settings for serializer."""

        model = DailyRequestStatistic
        fields = '__all__'
