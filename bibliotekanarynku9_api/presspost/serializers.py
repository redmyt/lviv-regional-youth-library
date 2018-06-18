"""
Module that describes the serializers for the PressPost and
PressPostTranslation models
"""

from rest_framework import serializers
from presspost.models import (PressPost,
                              PressPostTranslation,
                              PressPostTranslationLink)
from utils.language import filter_serialized_translations


class PressPostTranslationLinkSerializer(serializers.ModelSerializer):
    """PressPostTranslationLink model serializer."""

    class Meta:
        """Meta settings for serializer."""

        model = PressPostTranslationLink
        fields = '__all__'


class PressPostTranslationSerializer(serializers.ModelSerializer):
    """PressPostTranslation model serializer"""

    links = PressPostTranslationLinkSerializer(many=True, read_only=True)

    class Meta:
        """Meta settings for serializer."""

        model = PressPostTranslation
        fields = '__all__'


class PressPostSerializer(serializers.ModelSerializer):
    """PressPost model serializer"""

    translations = PressPostTranslationSerializer(many=True, read_only=True)

    class Meta:
        """Meta settings for serializer."""

        model = PressPost
        fields = '__all__'

    def to_representation(self, instance):
        """
        Overwrite method for filtering the output translation entities for the
        certain post according to the Accept-Language header from request.
        """

        ppost_data = super().to_representation(instance)
        request = self.context.get('request')
        result = filter_serialized_translations(ppost_data, request)
        return result
