"""
Module that describes the serializers for the NewsPost and
NewsPostTranslation models
"""

from rest_framework import serializers
from newspost.models import NewsPost, NewsPostTranslation


class NewsPostTranslationSerializer(serializers.ModelSerializer):
    """NewsPostTranslationSerializer model serializer."""

    class Meta:
        """Meta settings for serializer."""

        model = NewsPostTranslation
        fields = '__all__'

    def update(self, instance, validated_data):
        """Update the newsposttranslation instance."""

        if validated_data.get('post'):
            del validated_data['post']

        return super().update(instance, validated_data)


class NewsPostSerializer(serializers.ModelSerializer):
    """NewsPostSerializer model serializer."""

    translations = NewsPostTranslationSerializer(many=True, read_only=True)

    class Meta:
        """Meta settings for serializer."""

        model = NewsPost
        fields = '__all__'
