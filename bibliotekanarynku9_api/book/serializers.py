"""
Module that describes the serializers for the Book and
BookTranslation models
"""

from rest_framework import serializers
from book.models import Book, BookTranslation
from utils.language import filter_serialized_translations


class BookTranslationSerializer(serializers.ModelSerializer):
    """BookTranslationSerializer model serializer"""

    class Meta:
        """Meta settings for serializer."""

        model = BookTranslation
        fields = '__all__'


class BookSerializer(serializers.ModelSerializer):
    """Book model serializer"""

    translations = BookTranslationSerializer(many=True, read_only=True)

    class Meta:
        """Meta settings for serializer."""

        model = Book
        fields = '__all__'

    def to_representation(self, instance):
        """
        Overwrite method for filtering the output translation entities for the
        certain post according to the Accept-Language header from request."""

        book_data = super().to_representation(instance)
        request = self.context.get('request')
        result = filter_serialized_translations(book_data, request)
        return result
