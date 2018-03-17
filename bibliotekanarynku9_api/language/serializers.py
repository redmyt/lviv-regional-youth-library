"""
Module that describes the sirializer for the Language model
"""

from rest_framework import serializers
from language.models import Language


class LanguageSerializer(serializers.ModelSerializer):
    """Language model serializer"""

    class Meta:
        model = Language
        fields = '__all__'
