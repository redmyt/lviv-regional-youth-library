"""Module that describes the NewsPost logic."""

from rest_framework import viewsets
from utils.parsers import ImageParser
from django.conf import settings
import os
from rest_framework.response import Response
from newspost.models import NewsPost, NewsPostTranslation
from newspost.serializers import NewsPostSerializer, NewsPostTranslationSerializer
from utils.language import get_request_language
from utils.responses import (RESPONSE_200_DELETED,
                             RESPONSE_204_UPDATED,
                             RESPONSE_400_INVALID_DATA,
                             RESPONSE_400_DB_INTEGRATION_FAILURE,
                             RESPONSE_403_PERMISSIONS_REQUIRED,
                             RESPONSE_404_NOT_FOUND)


POST_CREATE_PERM = 'newspost.add_newspost'
POST_UPDATE_PERM = 'newspost.change_newspost'
POST_DELETE_PERM = 'newspost.delete_newspost'
TRANSLATION_CREATE_PERM = 'newspost.add_newsposttranslation'
TRANSLATION_UPDATE_PERM = 'newspost.change_newsposttranslation'
TRANSLATION_DELETE_PERM = 'newspost.delete_newsposttranslation'


class NewsPostViewSet(viewsets.ModelViewSet):
    """A viewset for viewing and editing NewsPost instances."""

    serializer_class = NewsPostSerializer
    queryset = NewsPost.objects.all()

    def create(self, request, *args, **kwargs):
        """POST request logic."""

        user = request.user

        if not user.has_perm(POST_CREATE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        data = request.data
        # import pdb; pdb.set_trace()
        ip = ImageParser(dist=settings.MEDIA_ROOT, decoded_data=data['avatar'])
        data['avatar'] = ip.parse()
        serializer = NewsPostSerializer(data=data)

        if not serializer.is_valid():
            return RESPONSE_400_INVALID_DATA

        post = serializer.save()
        if not post:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return Response(serializer.data, status=201)

    def update(self, request, **kwargs):
        """PUT request logic."""

        user = request.user
        post_pk = kwargs['pk']

        if not user.has_perm(POST_UPDATE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        post = NewsPost.get_by_id(post_pk)
        if not post:
            return RESPONSE_404_NOT_FOUND

        data = request.data
        serializer = NewsPostSerializer(post, data=data, partial=True)

        if not serializer.is_valid():
            return RESPONSE_400_INVALID_DATA

        translation = serializer.save()
        if not translation:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return RESPONSE_204_UPDATED

    def destroy(self, request, **kwargs):
        """DELETE request logic."""

        user = request.user
        post_pk = kwargs['pk']

        if not user.has_perm(POST_DELETE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        is_delete = NewsPost.delete_by_id(post_pk)
        if not is_delete:
            return RESPONSE_404_NOT_FOUND

        return RESPONSE_200_DELETED


class NewsPostTranslationViewSet(viewsets.ModelViewSet):
    """A viewset for viewing and editing NewsPostTranslation instances."""

    serializer_class = NewsPostTranslationSerializer
    queryset = NewsPostTranslation.objects.all()

    def get_queryset(self):
        """Add language filter to the base newsposttranslations queryset."""

        queryset = self.queryset.filter(post=self.kwargs['news_post_pk'])
        lang_code = get_request_language(self.request)
        if lang_code:
            return queryset.filter(language=lang_code)
        return queryset

    def create(self, request, *args, **kwargs):
        """POST request logic."""

        user = request.user
        post_pk = kwargs['news_post_pk']

        if not user.has_perm(TRANSLATION_CREATE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        data = {'post': post_pk, **request.data}
        serializer = NewsPostTranslationSerializer(data=data)

        if not serializer.is_valid():
            print(serializer.errors)
            return RESPONSE_400_INVALID_DATA

        translation = serializer.save()
        if not translation:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return Response(serializer.data, 201)

    def update(self, request, **kwargs):
        """PUT request logic."""

        user = request.user
        translation_pk = kwargs['pk']

        if not user.has_perm(TRANSLATION_UPDATE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        translation = NewsPostTranslation.get_by_id(translation_pk)
        if not translation:
            return RESPONSE_404_NOT_FOUND

        data = request.data
        serializer = NewsPostTranslationSerializer(
            translation,
            data=data,
            partial=True)

        if not serializer.is_valid():
            return RESPONSE_400_INVALID_DATA

        translation = serializer.save()
        if not translation:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return RESPONSE_204_UPDATED

    def destroy(self, request, **kwargs):
        """DELETE request logic."""

        user = request.user
        translation_pk = kwargs['pk']

        if not user.has_perm(TRANSLATION_DELETE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        is_delete = NewsPostTranslation.delete_by_id(translation_pk)
        if not is_delete:
            return RESPONSE_404_NOT_FOUND

        return RESPONSE_200_DELETED
