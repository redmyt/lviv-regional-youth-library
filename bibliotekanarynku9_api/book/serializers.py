"""
Module that describes the serializers for the Book and
BookTranslation models
"""

from rest_framework import serializers
from book.models import Book, BookTranslation


class BookSerializer(serializers.ModelSerializer):
    """Book model serializer"""

    class Meta:
        model = Book
        fields = '__all__'


class BookTranslationSerializer(serializers.ModelSerializer):
    """BookTranslationSerializer model serializer"""

    book = BookSerializer()

    class Meta:
        model = BookTranslation
        fields = '__all__'

    def create(self, validated_data):
        book_data = validated_data.pop('book')
        authors_data = book_data.pop('authors')
        book = Book.objects.create(**book_data)
        book.authors.add(*authors_data)
        book_translation = BookTranslation.objects.create(
            book=book,
            **validated_data)
        return book_translation

    def update(self, instance, validated_data):
        book_data = validated_data.pop('book')
        book = instance.book

        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get(
            'description',
            instance.description)
        instance.language = validated_data.get('language', instance.language)
        instance.save()

        if isinstance(book_data, dict):
            book.authors = book_data.get('authors', book.authors)
            book.avatar = book_data.get('avatar', book.avatar)
            book.published_at = book_data.get(
                'published_at',
                book.published_at)
            book.save()

        return instance
