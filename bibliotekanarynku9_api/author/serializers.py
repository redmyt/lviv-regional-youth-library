"""
Module that describes the serializers for the Author and
AuthorTranslation models
"""

from rest_framework import serializers
from author.models import Author, AuthorTranslation


class AuthorSerializer(serializers.ModelSerializer):
    """Author model serializer"""

    class Meta:
        model = Author
        fields = '__all__'


class AuthorTranslationSerializer(serializers.ModelSerializer):
    """AuthorTranslationSerializer model serializer"""

    author = AuthorSerializer()

    class Meta:
        model = AuthorTranslation
        fields = '__all__'

    def create(self, validated_data):
        author_data = validated_data.pop('author')
        author = Author.objects.create(**author_data)
        author_translation = AuthorTranslation.objects.create(
            author=author,
            **validated_data)
        return author_translation

    def update(self, instance, validated_data):
        instance.language = validated_data.get('language', instance.language)
        instance.first_name = validated_data.get(
            'first_name',
            instance.first_name)
        instance.second_name = validated_data.get(
            'second_name',
            instance.second_name)
        instance.save()
        return instance
