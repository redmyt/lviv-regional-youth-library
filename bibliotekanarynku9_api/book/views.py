"""Module that describes the Book controller logic."""

from rest_framework import viewsets
from rest_framework.response import Response
from book.models import (Book,
                         BookTranslation)
from book.serializers import (BookSerializer,
                              BookTranslationSerializer)
from utils.handlers import IMAGE_HANDLER
from utils.responses import (RESPONSE_200_DELETED,
                             RESPONSE_204_UPDATED,
                             RESPONSE_400_INVALID_DATA,
                             RESPONSE_403_PERMISSIONS_REQUIRED,
                             RESPONSE_400_DB_INTEGRATION_FAILURE,
                             RESPONSE_404_NOT_FOUND,
                             RESPONSE_404_NOT_FOUND_RELATED_OBJECT)


POST_CREATE_PERM = 'book.add_book'
POST_UPDATE_PERM = 'book.change_book'
POST_DELETE_PERM = 'book.delete_book'
TRANSLATION_CREATE_PERM = 'book.add_booktranslation'
TRANSLATION_UPDATE_PERM = 'book.change_booktranslation'
TRANSLATION_DELETE_PERM = 'book.delete_booktranslation'


class BookViewSet(viewsets.ModelViewSet):
    """A viewset for applying the CRUD operation on Book instances."""

    serializer_class = BookSerializer
    queryset = Book.objects.all()

    def create(self, request, *args, **kwargs):
        """POST request logic."""

        user = request.user
        if not user.has_perm(POST_CREATE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        book_data = request.data
        book_data['avatar'] = IMAGE_HANDLER.parse(book_data.get('avatar'))
        serializer = BookSerializer(data=book_data)

        if not serializer.is_valid():
            return RESPONSE_400_INVALID_DATA

        book = serializer.save()
        if not book:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return Response(serializer.data, status=201)

    def update(self, request, **kwargs):
        """PUT request logic."""

        user = request.user
        book_pk = int(kwargs['pk'])

        if not user.has_perm(POST_UPDATE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        book = Book.get_by_id(book_pk)
        if not book:
            return RESPONSE_404_NOT_FOUND

        book_data = request.data
        book_avatar = IMAGE_HANDLER.parse(book_data.get('avatar'))
        if book_avatar:
            book_data['avatar'] = book_avatar
        serializer = BookSerializer(book, data=book_data, partial=True)

        if not serializer.is_valid():
            return RESPONSE_400_INVALID_DATA

        IMAGE_HANDLER.remove_image(book.avatar)
        book = serializer.save()
        if not book:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return RESPONSE_204_UPDATED

    def destroy(self, request, **kwargs):
        """DELETE request logic."""

        user = request.user
        book_pk = int(kwargs['pk'])

        if not user.has_perm(POST_DELETE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        book = Book.get_by_id(book_pk)
        if not book:
            return RESPONSE_404_NOT_FOUND

        avatar = book.avatar
        is_delete = Book.delete_by_id(book_pk)
        if not is_delete:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        IMAGE_HANDLER.remove_image(avatar)
        return RESPONSE_200_DELETED


class BookTranslationViewSet(viewsets.ModelViewSet):
    """
    A viewset for applying the CRUD operation on BookTranslation
    instances.
    """

    serializer_class = BookTranslationSerializer

    def get_queryset(self):
        """
        Add language translation filter to the base
        Booktranslation queryset.
        """

        book_pk = int(self.kwargs['book_pk'])
        return BookTranslation.objects.filter(book=book_pk)

    def create(self, request, *args, **kwargs):
        """POST request logic."""

        user = request.user
        book_pk = int(kwargs['book_pk'])
        if not user.has_perm(TRANSLATION_CREATE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        book_data = {'book': book_pk, **request.data}
        serializer = BookTranslationSerializer(data=book_data)

        if not serializer.is_valid():
            return RESPONSE_400_INVALID_DATA

        book_transl = serializer.save()
        if not book_transl:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return Response(serializer.data, 201)

    def update(self, request, **kwargs):
        """PUT request logic."""

        user = request.user
        book_pk = int(kwargs['book_pk'])
        book_transl_pk = int(kwargs['pk'])

        if not user.has_perm(TRANSLATION_UPDATE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        book_transl = BookTranslation.get_by_id(book_transl_pk)
        if not book_transl:
            return RESPONSE_404_NOT_FOUND

        if not book_transl.book.id == book_pk:
            return RESPONSE_404_NOT_FOUND_RELATED_OBJECT

        book_transl_data = request.data
        serializer = BookTranslationSerializer(
            book_transl,
            data=book_transl_data,
            partial=True)

        if not serializer.is_valid():
            return RESPONSE_400_INVALID_DATA

        book_transl = serializer.save()
        if not book_transl:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return RESPONSE_204_UPDATED

    def destroy(self, request, **kwargs):
        """DELETE request logic."""

        user = request.user
        book_pk = int(kwargs['book_pk'])
        book_transl_pk = int(kwargs['pk'])

        if not user.has_perm(TRANSLATION_DELETE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        book_transl = BookTranslation.get_by_id(book_transl_pk)
        if not book_transl:
            return RESPONSE_404_NOT_FOUND

        if not book_transl.book.id == book_pk:
            return RESPONSE_404_NOT_FOUND_RELATED_OBJECT

        is_delete = BookTranslation.delete_by_id(book_transl_pk)
        if not is_delete:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return RESPONSE_200_DELETED
