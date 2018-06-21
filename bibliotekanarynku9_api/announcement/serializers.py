"""
Module that describes the serializers for the Announcement and
AnnouncementTranslation models
"""

from rest_framework import serializers
from announcement.models import (Announcement,
                                 AnnouncementTranslation,
                                 AnnouncementTranslationLink)
from utils.language import filter_serialized_translations


class AnnouncementTranslationLinkSerializer(serializers.ModelSerializer):
    """AnnouncementTranslationLinkSerializer model serializer."""

    class Meta:
        """Meta settings for serializer."""

        model = AnnouncementTranslationLink
        fields = '__all__'


class AnnouncementTranslationSerializer(serializers.ModelSerializer):
    """AnnouncementTranslationSerializer model serializer"""

    links = AnnouncementTranslationLinkSerializer(many=True, read_only=True)

    class Meta:
        """Meta settings for serializer."""

        model = AnnouncementTranslation
        fields = '__all__'


class AnnouncementSerializer(serializers.ModelSerializer):
    """Announcement model serializer"""

    translations = AnnouncementTranslationSerializer(many=True, read_only=True)

    class Meta:
        """Meta settings for serializer."""

        model = Announcement
        fields = '__all__'

    def to_representation(self, instance):
        """
        Overwrite method for filtering the output translation entities for the
        certain announcement according to the Accept-Language header
        from request.
        """

        ann_data = super().to_representation(instance)
        request = self.context.get('request')
        result = filter_serialized_translations(ann_data, request)
        return result
