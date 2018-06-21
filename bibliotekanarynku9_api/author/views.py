"""Module that describes the Author controller logic."""

from rest_framework import viewsets
from rest_framework.response import Response
from author.models import Author, AuthorTranslation
from author.serializers import AuthorSerializer, AuthorTranslationSerializer
from utils.responses import (RESPONSE_200_DELETED,
                             RESPONSE_204_UPDATED,
                             RESPONSE_400_INVALID_DATA,
                             RESPONSE_404_NOT_FOUND,
                             RESPONSE_400_DB_INTEGRATION_FAILURE,
                             RESPONSE_403_PERMISSIONS_REQUIRED,
                             RESPONSE_404_NOT_FOUND_RELATED_OBJECT)


POST_CREATE_PERM = 'author.add_author'
POST_UPDATE_PERM = 'author.change_author'
POST_DELETE_PERM = 'author.delete_author'
TRANSLATION_CREATE_PERM = 'author.add_authortranslation'
TRANSLATION_UPDATE_PERM = 'author.change_authortranslation'
TRANSLATION_DELETE_PERM = 'author.delete_authortranslation'


class AuthorViewSet(viewsets.ModelViewSet):
    """A viewset for applying the CRUD operation on Author instances."""

    serializer_class = AuthorSerializer
    queryset = Author.objects.all()

    def create(self, request, *args, **kwargs):
        """POST request logic."""

        user = request.user
        if not user.has_perm(POST_CREATE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        author_data = request.data
        serializer = AuthorSerializer(data=author_data)

        if not serializer.is_valid():
            return RESPONSE_400_INVALID_DATA

        author = serializer.save()
        if not author:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return Response(serializer.data, status=201)

    def update(self, request, **kwargs):
        """PUT request logic."""

        user = request.user
        author_pk = int(kwargs['pk'])

        if not user.has_perm(POST_UPDATE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        author = Author.get_by_id(author_pk)
        if not author:
            return RESPONSE_404_NOT_FOUND

        author_data = request.data
        serializer = AuthorSerializer(author, data=author_data, partial=True)

        if not serializer.is_valid():
            return RESPONSE_400_INVALID_DATA

        author = serializer.save()
        if not author:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return RESPONSE_204_UPDATED

    def destroy(self, request, **kwargs):
        """DELETE request logic."""

        user = request.user
        author_pk = int(kwargs['pk'])

        if not user.has_perm(POST_DELETE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        is_delete = Author.delete_by_id(author_pk)
        if not is_delete:
            return RESPONSE_404_NOT_FOUND

        return RESPONSE_200_DELETED


class AuthorTranslationViewSet(viewsets.ModelViewSet):
    """
    A viewset for applying the CRUD operation on AuthorTranslation
    instances.
    """

    serializer_class = AuthorTranslationSerializer

    def get_queryset(self):
        """Add language filter to the base Authortranslation queryset."""

        author_pk = int(self.kwargs['author_pk'])
        return AuthorTranslation.objects.filter(author=author_pk)

    def create(self, request, *args, **kwargs):
        """POST request logic."""

        user = request.user
        author_pk = int(kwargs['author_pk'])
        if not user.has_perm(TRANSLATION_CREATE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        author_data = {'author': author_pk, **request.data}
        serializer = AuthorTranslationSerializer(data=author_data)

        if not serializer.is_valid():
            return RESPONSE_400_INVALID_DATA

        author_transl = serializer.save()
        if not author_transl:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return Response(serializer.data, 201)

    def update(self, request, **kwargs):
        """PUT request logic."""

        user = request.user
        author_pk = int(kwargs['author_pk'])
        author_transl_pk = int(kwargs['pk'])

        if not user.has_perm(TRANSLATION_UPDATE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        author_transl = AuthorTranslation.get_by_id(author_transl_pk)
        if not author_transl:
            return RESPONSE_404_NOT_FOUND

        if not author_transl.author.id == author_pk:
            return RESPONSE_404_NOT_FOUND_RELATED_OBJECT

        data = request.data
        serializer = AuthorTranslationSerializer(
            author_transl,
            data=data,
            partial=True)

        if not serializer.is_valid():
            return RESPONSE_400_INVALID_DATA

        author_transl = serializer.save()
        if not author_transl:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return RESPONSE_204_UPDATED

    def destroy(self, request, **kwargs):
        """DELETE request logic."""

        user = request.user
        author_pk = int(kwargs['author_pk'])
        author_transl_pk = int(kwargs['pk'])

        if not user.has_perm(TRANSLATION_DELETE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        author_transl = AuthorTranslation.get_by_id(author_transl_pk)
        if not author_transl:
            return RESPONSE_404_NOT_FOUND

        if not author_transl.author.id == author_pk:
            return RESPONSE_404_NOT_FOUND_RELATED_OBJECT

        is_delete = AuthorTranslation.delete_by_id(author_transl_pk)
        if not is_delete:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return RESPONSE_200_DELETED
