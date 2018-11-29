"""Module that describes the NewsPost controller logic."""

from rest_framework import viewsets
from rest_framework.response import Response
from newspost.models import (NewsPost,
                             NewsPostTranslation,
                             NewsPostTranslationLink)
from newspost.serializers import (NewsPostSerializer,
                                  NewsPostTranslationSerializer,
                                  NewsPostTranslationLinkSerializer)
from utils.handlers import IMAGE_HANDLER
from utils.responses import (RESPONSE_200_DELETED,
                             RESPONSE_204_UPDATED,
                             RESPONSE_400_INVALID_DATA,
                             RESPONSE_400_DB_INTEGRATION_FAILURE,
                             RESPONSE_403_PERMISSIONS_REQUIRED,
                             RESPONSE_404_NOT_FOUND,
                             RESPONSE_404_NOT_FOUND_RELATED_OBJECT)


POST_CREATE_PERM = 'newspost.add_newspost'
POST_UPDATE_PERM = 'newspost.change_newspost'
POST_DELETE_PERM = 'newspost.delete_newspost'
TRANSLATION_CREATE_PERM = 'newspost.add_newsposttranslation'
TRANSLATION_UPDATE_PERM = 'newspost.change_newsposttranslation'
TRANSLATION_DELETE_PERM = 'newspost.delete_newsposttranslation'
LINK_CREATE_PERM = 'newspost.add_newsposttranslationlink'
LINK_UPDATE_PERM = 'newspost.change_newsposttranslationlink'
LINK_DELETE_PERM = 'newspost.delete_newsposttranslationlink'


class NewsPostViewSet(viewsets.ModelViewSet):
    """A viewset for applying the CRUD operation on NewsPost instances."""

    serializer_class = NewsPostSerializer
    queryset = NewsPost.objects.all()

    def create(self, request, *args, **kwargs):
        """POST request logic."""

        user = request.user
        if not user.has_perm(POST_CREATE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        npost_data = request.data
        npost_data['avatar'] = IMAGE_HANDLER.parse(npost_data.get('avatar'))
        serializer = NewsPostSerializer(data=npost_data)

        if not serializer.is_valid():
            return RESPONSE_400_INVALID_DATA

        npost = serializer.save()
        if not npost:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return Response(serializer.data, status=201)

    def update(self, request, **kwargs):
        """PUT request logic."""

        user = request.user
        npost_pk = int(kwargs['pk'])

        if not user.has_perm(POST_UPDATE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        npost = NewsPost.get_by_id(npost_pk)
        if not npost:
            return RESPONSE_404_NOT_FOUND

        npost_data = request.data
        npost_avatar = IMAGE_HANDLER.parse(npost_data.get('avatar'))
        if npost_avatar:
            npost_data['avatar'] = npost_avatar
        serializer = NewsPostSerializer(npost, data=npost_data, partial=True)

        if not serializer.is_valid():
            return RESPONSE_400_INVALID_DATA

        IMAGE_HANDLER.remove_image(npost.avatar)
        npost = serializer.save()
        if not npost:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return RESPONSE_204_UPDATED

    def destroy(self, request, **kwargs):
        """DELETE request logic."""

        user = request.user
        npost_pk = int(kwargs['pk'])

        if not user.has_perm(POST_DELETE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        npost = NewsPost.get_by_id(npost_pk)
        if not npost:
            return RESPONSE_404_NOT_FOUND

        avatar = npost.avatar
        is_delete = NewsPost.delete_by_id(npost_pk)
        if not is_delete:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        IMAGE_HANDLER.remove_image(avatar)
        return RESPONSE_200_DELETED


class NewsPostTranslationViewSet(viewsets.ModelViewSet):
    """
    A viewset for applying the CRUD operation on NewsPostTranslation
    instances.
    """

    serializer_class = NewsPostTranslationSerializer

    def get_queryset(self):
        """Add language filter to the base newsposttranslation queryset."""

        npost_pk = int(self.kwargs['news_post_pk'])
        return NewsPostTranslation.objects.filter(post=npost_pk)

    def create(self, request, *args, **kwargs):
        """POST request logic."""

        user = request.user
        npost_pk = int(kwargs['news_post_pk'])
        if not user.has_perm(TRANSLATION_CREATE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        npost_data = {'post': npost_pk, **request.data}
        serializer = NewsPostTranslationSerializer(data=npost_data)

        if not serializer.is_valid():
            return RESPONSE_400_INVALID_DATA

        npost_transl = serializer.save()
        if not npost_transl:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return Response(serializer.data, 201)

    def update(self, request, **kwargs):
        """PUT request logic."""

        user = request.user
        npost_pk = int(kwargs['news_post_pk'])
        npost_transl_pk = int(kwargs['pk'])

        if not user.has_perm(TRANSLATION_UPDATE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        npost_transl = NewsPostTranslation.get_by_id(npost_transl_pk)
        if not npost_transl:
            return RESPONSE_404_NOT_FOUND

        if not npost_transl.post.id == npost_pk:
            return RESPONSE_404_NOT_FOUND_RELATED_OBJECT

        npost_transl_data = request.data
        serializer = NewsPostTranslationSerializer(
            npost_transl,
            data=npost_transl_data,
            partial=True)

        if not serializer.is_valid():
            return RESPONSE_400_INVALID_DATA

        npost_transl = serializer.save()
        if not npost_transl:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return RESPONSE_204_UPDATED

    def destroy(self, request, **kwargs):
        """DELETE request logic."""

        user = request.user
        npost_pk = int(kwargs['news_post_pk'])
        npost_transl_pk = int(kwargs['pk'])

        if not user.has_perm(TRANSLATION_DELETE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        npost_transl = NewsPostTranslation.get_by_id(npost_transl_pk)
        if not npost_transl:
            return RESPONSE_404_NOT_FOUND

        if not npost_transl.post.id == npost_pk:
            return RESPONSE_404_NOT_FOUND_RELATED_OBJECT

        is_delete = NewsPostTranslation.delete_by_id(npost_transl_pk)
        if not is_delete:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return RESPONSE_200_DELETED


class NewsPostTranslationLinkViewSet(viewsets.ModelViewSet):
    """
    A viewset for applying the CRUD operation on
    NewsPostTranslationLink instances.
    """

    serializer_class = NewsPostTranslationLinkSerializer

    def get_queryset(self):
        """
        Add the certain translation and post filter to the base
        newsposttranslationlink queryset.
        """

        npost_pk = int(self.kwargs['news_post_pk'])
        npost_transl_pk = int(self.kwargs['translation_pk'])

        queryset = NewsPostTranslationLink.objects.filter(
            translation=npost_transl_pk,
            translation__post=npost_pk)
        return queryset

    def create(self, request, *args, **kwargs):
        """POST request logic."""

        user = request.user
        npost_pk = int(kwargs['news_post_pk'])
        npost_transl_pk = int(kwargs['translation_pk'])

        if not user.has_perm(LINK_CREATE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        npost_transl = NewsPostTranslation.get_by_id(npost_transl_pk)
        if not npost_transl:
            return RESPONSE_404_NOT_FOUND_RELATED_OBJECT

        if not npost_transl.post.id == npost_pk:
            return RESPONSE_404_NOT_FOUND_RELATED_OBJECT

        npost_link_data = {'translation': npost_transl_pk, **request.data}
        serializer = NewsPostTranslationLinkSerializer(data=npost_link_data)

        if not serializer.is_valid():
            return RESPONSE_400_INVALID_DATA

        npost_link = serializer.save()
        if not npost_link:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return Response(serializer.data, 201)

    def update(self, request, **kwargs):
        """PUT request logic."""

        user = request.user
        npost_pk = int(kwargs['news_post_pk'])
        npost_transl_pk = int(kwargs['translation_pk'])
        npost_link_pk = int(kwargs['pk'])

        if not user.has_perm(LINK_UPDATE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        npost_link = NewsPostTranslationLink.get_by_id(npost_link_pk)
        if not npost_link:
            return RESPONSE_404_NOT_FOUND

        is_translation = npost_link.translation.id == npost_transl_pk
        is_post = npost_link.translation.post.id == npost_pk
        if not is_translation or not is_post:
            return RESPONSE_404_NOT_FOUND_RELATED_OBJECT

        npost_link_data = request.data
        serializer = NewsPostTranslationLinkSerializer(
            npost_link,
            data=npost_link_data,
            partial=True)

        if not serializer.is_valid():
            return RESPONSE_400_INVALID_DATA

        npost_link = serializer.save()
        if not npost_link:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return RESPONSE_204_UPDATED

    def destroy(self, request, **kwargs):
        """DELETE request logic."""

        user = request.user
        npost_pk = int(kwargs['news_post_pk'])
        npost_transl_pk = int(kwargs['translation_pk'])
        npost_link_pk = int(kwargs['pk'])

        if not user.has_perm(LINK_DELETE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        npost_link = NewsPostTranslationLink.get_by_id(npost_link_pk)
        if not npost_link:
            return RESPONSE_404_NOT_FOUND

        is_translation = npost_link.translation.id == npost_transl_pk
        is_post = npost_link.translation.post.id == npost_pk
        if not is_translation or not is_post:
            return RESPONSE_404_NOT_FOUND_RELATED_OBJECT

        is_delete = NewsPostTranslationLink.delete_by_id(npost_link_pk)
        if not is_delete:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return RESPONSE_200_DELETED
