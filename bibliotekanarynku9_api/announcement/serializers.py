"""
Module that describes the serializers for the Announcement and
AnnouncementTranslation models
"""

from rest_framework import serializers
from announcement.models import Announcement, AnnouncementTranslation


class AnnouncementSerializer(serializers.ModelSerializer):
    """Announcement model serializer"""

    class Meta:
        model = Announcement
        fields = '__all__'


class AnnouncementTranslationSerializer(serializers.ModelSerializer):
    """AnnouncementTranslationSerializer model serializer"""

    announcement = AnnouncementSerializer()

    class Meta:
        model = AnnouncementTranslation
        fields = '__all__'

    def create(self, validated_data):
        announcement_data = validated_data.pop('announcement')
        links_data = announcement_data.pop('links')
        announcement = Announcement.objects.create(**announcement_data)
        announcement.links.add(*links_data)
        announcement_translation = AnnouncementTranslation.objects.create(
            announcement=announcement,
            **validated_data)
        return announcement_translation

    def update(self, instance, validated_data):
        announcement_data = validated_data.pop('announcement')
        announcement = instance.announcement

        instance.language = validated_data.get('language', instance.language)
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get(
            'description',
            instance.description)
        instance.organizer = validated_data.get(
            'organizer',
            instance.organizer)
        instance.save()

        if isinstance(announcement_data, dict):
            announcement.links = announcement_data.get(
                'links',
                announcement.links)
            announcement.avatar = announcement_data.get(
                'avatar',
                announcement.avatar)
            announcement.start_at = announcement_data.get(
                'start_at',
                announcement.start_at)
            announcement.save()

        return instance
