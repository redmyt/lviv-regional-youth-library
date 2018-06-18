"""
Module that describes the serializers for the NewsPost and
NewsPostTranslation models
"""

from rest_framework import serializers
from newspost.models import NewsPost, NewsPostTranslation, NewsPostTranslationLink
from utils.language import filter_serialized_translations


class NewsPostTranslationLinkSerializer(serializers.ModelSerializer):
    """NewsPostTranslationLinkSerializer model serializer."""

    class Meta:
        """Meta settings for serializer."""

        model = NewsPostTranslationLink
        fields = '__all__'


class NewsPostTranslationSerializer(serializers.ModelSerializer):
    """NewsPostTranslationSerializer model serializer."""

    links = NewsPostTranslationLinkSerializer(many=True, read_only=True)

    class Meta:
        """Meta settings for serializer."""

        model = NewsPostTranslation
        fields = '__all__'


class NewsPostSerializer(serializers.ModelSerializer):
    """NewsPostSerializer model serializer."""

    translations = NewsPostTranslationSerializer(many=True, read_only=True)

    class Meta:
        """Meta settings for serializer."""

        model = NewsPost
        fields = '__all__'

    def to_representation(self, instance):
        """
        Overwrite method for filtering the output translation entities for the
        certain post according to the Accept-Language header from request."""

        npost_data = super().to_representation(instance)
        request = self.context.get('request')
        result = filter_serialized_translations(npost_data, request)
        return result
