"""
Module that describes the serializer for the Link model.
"""

from rest_framework import serializers
from link.models import Link


class LinkSerializer(serializers.ModelSerializer):
    """LinkSerializer model serializer"""

    class Meta:
        model = Link
        fields = '__all__'
