"""
Module that describes the serializer for the NewsPostSerializer and
NewsPostTranslationSerializer models
"""

from rest_framework import serializers
from newspost.models import NewsPost, NewsPostTranslation


class NewsPostSerializer(serializers.ModelSerializer):
    """NewsPostSerializer model serializer"""

    class Meta:
        model = NewsPost
        fields = '__all__'


class NewsPostTranslationSerializer(serializers.ModelSerializer):
    """NewsPostTranslationSerializer model serializer"""

    post = NewsPostSerializer()

    class Meta:
        model = NewsPostTranslation
        fields = '__all__'

    def create(self, validated_data):
        post_data = validated_data.pop('post')
        post = NewsPost.objects.create(**post_data)
        post_translation = NewsPostTranslation.objects.create(
            post=post,
            **validated_data)
        return post_translation

    def update(self, instance, validated_data):
        post_data = validated_data.pop('post')
        post = instance.post

        instance.title = validated_data.get('title', instance.title)
        instance.language = validated_data.get('language', instance.language)
        instance.description = validated_data.get(
            'description',
            instance.description)
        instance.save()

        if isinstance(post_data, dict):
            post.avatar = post_data.get('avatar', post.avatar)
            post.save()

        return instance
