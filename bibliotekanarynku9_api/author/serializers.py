"""
Module that describes the serializers for the Author and
AuthorTranslation models
"""

from rest_framework import serializers
from author.models import Author, AuthorTranslation
from utils.language import filter_serialized_translations


class AuthorTranslationSerializer(serializers.ModelSerializer):
    """AuthorTranslationSerializer model serializer"""

    class Meta:
        """Meta settings for serializer."""

        model = AuthorTranslation
        fields = '__all__'



class AuthorSerializer(serializers.ModelSerializer):
    """Author model serializer"""

    translations = AuthorTranslationSerializer(many=True, read_only=True)

    class Meta:
        """Meta settings for serializer."""

        model = Author
        fields = '__all__'


    def to_representation(self, instance):
        """
        Overwrite method for filtering the output translation entities for the
        certain post according to the Accept-Language header from request.
        """

        author_data = super().to_representation(instance)
        request = self.context.get('request')
        result = filter_serialized_translations(author_data, request)
        return result
