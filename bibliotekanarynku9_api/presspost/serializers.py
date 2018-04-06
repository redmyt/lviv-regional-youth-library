"""
Module that describes the serializers for the PressPost and
PressPostTranslation models
"""

from rest_framework import serializers
from presspost.models import PressPost, PressPostTranslation


class PressPostSerializer(serializers.ModelSerializer):
    """PressPost model serializer"""

    class Meta:
        model = PressPost
        fields = '__all__'


class PressPostTranslationSerializer(serializers.ModelSerializer):
    """PressPostTranslationSerializer model serializer"""

    post = PressPostSerializer()

    class Meta:
        model = PressPostTranslation
        fields = '__all__'

    def create(self, validated_data):
        post_data = validated_data.pop('post')
        links_data = post_data.pop('links')
        post = PressPost.objects.create(**post_data)
        post.links.add(*links_data)
        post_translation = PressPostTranslation.objects.create(
            post=post,
            **validated_data)
        return post_translation

    def update(self, instance, validated_data):
        post = instance.post
        post_data = validated_data.pop('post')

        instance.language = validated_data.get('language', instance.language)
        instance.description = validated_data.get(
            'description',
            instance.description)
        instance.title = validated_data.get('title', instance.title)
        instance.save()

        if isinstance(post_data, dict):
            post.links = post_data.get('links', post.links)
            post.avatar = post_data.get('avatar', post.avatar)
            post.save()

        return instance
