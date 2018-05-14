"""Module that describes the NewsPost contraller logic."""

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

        data = request.data
        data['avatar'] = IMAGE_HANDLER.parse(data.get('avatar'))
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
        post_pk = int(kwargs['pk'])

        if not user.has_perm(POST_UPDATE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        post = NewsPost.get_by_id(post_pk)
        if not post:
            return RESPONSE_404_NOT_FOUND

        data = request.data
        serializer = NewsPostSerializer(post, data=data, partial=True)

        if not serializer.is_valid():
            return RESPONSE_400_INVALID_DATA

        post = serializer.save()
        if not post:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return RESPONSE_204_UPDATED

    def destroy(self, request, **kwargs):
        """DELETE request logic."""

        user = request.user
        post_pk = int(kwargs['pk'])

        if not user.has_perm(POST_DELETE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        avatar = NewsPost.get_by_id(post_pk).avatar
        is_delete = NewsPost.delete_by_id(post_pk)
        if not is_delete:
            return RESPONSE_404_NOT_FOUND

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

        post_pk = int(self.kwargs['news_post_pk'])
        return NewsPostTranslation.objects.filter(post=post_pk)

    def create(self, request, *args, **kwargs):
        """POST request logic."""

        user = request.user
        post_pk = int(kwargs['news_post_pk'])
        if not user.has_perm(TRANSLATION_CREATE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        data = {'post': post_pk, **request.data}
        serializer = NewsPostTranslationSerializer(data=data)

        if not serializer.is_valid():
            return RESPONSE_400_INVALID_DATA

        translation = serializer.save()
        if not translation:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return Response(serializer.data, 201)

    def update(self, request, **kwargs):
        """PUT request logic."""

        user = request.user
        post_pk = int(kwargs['news_post_pk'])
        translation_pk = int(kwargs['pk'])

        if not user.has_perm(TRANSLATION_UPDATE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        translation = NewsPostTranslation.get_by_id(translation_pk)
        if not translation:
            return RESPONSE_404_NOT_FOUND

        if not translation.post.id == post_pk:
            return RESPONSE_404_NOT_FOUND_RELATED_OBJECT

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
        post_pk = int(kwargs['news_post_pk'])
        translation_pk = int(kwargs['pk'])

        if not user.has_perm(TRANSLATION_DELETE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        translation = NewsPostTranslation.get_by_id(translation_pk)
        if not translation:
            return RESPONSE_404_NOT_FOUND

        if not translation.post.id == post_pk:
            return RESPONSE_404_NOT_FOUND_RELATED_OBJECT

        is_delete = NewsPostTranslation.delete_by_id(translation_pk)
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

        post_pk = int(self.kwargs['news_post_pk'])
        translation_pk = int(self.kwargs['translation_pk'])

        queryset = NewsPostTranslationLink.objects.filter(
            translation=translation_pk,
            translation__post=post_pk)
        return queryset

    def create(self, request, *args, **kwargs):
        """POST request logic."""

        user = request.user
        post_pk = int(kwargs['news_post_pk'])
        translation_pk = int(kwargs['translation_pk'])

        if not user.has_perm(LINK_CREATE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        translation = NewsPostTranslation.get_by_id(translation_pk)
        if not translation:
            return RESPONSE_404_NOT_FOUND

        if not translation.post.id == post_pk:
            return RESPONSE_404_NOT_FOUND_RELATED_OBJECT

        data = {'translation': translation_pk, **request.data}
        serializer = NewsPostTranslationLinkSerializer(data=data)

        if not serializer.is_valid():
            return RESPONSE_400_INVALID_DATA

        link = serializer.save()
        if not link:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return Response(serializer.data, 201)

    def update(self, request, **kwargs):
        """PUT request logic."""

        user = request.user
        post_pk = int(kwargs['news_post_pk'])
        translation_pk = int(kwargs['translation_pk'])
        link_pk = int(kwargs['pk'])

        if not user.has_perm(LINK_UPDATE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        link = NewsPostTranslationLink.get_by_id(link_pk)
        if not link:
            return RESPONSE_404_NOT_FOUND

        is_translation = link.translation.id == translation_pk
        is_post = link.translation.post.id == post_pk
        if not is_translation or not is_post:
            return RESPONSE_404_NOT_FOUND_RELATED_OBJECT

        data = request.data
        serializer = NewsPostTranslationLinkSerializer(
            link,
            data=data,
            partial=True)

        if not serializer.is_valid():
            return RESPONSE_400_INVALID_DATA

        link = serializer.save()
        if not link:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return RESPONSE_204_UPDATED

    def destroy(self, request, **kwargs):
        """DELETE request logic."""

        user = request.user
        post_pk = int(kwargs['news_post_pk'])
        translation_pk = int(kwargs['translation_pk'])
        link_pk = int(kwargs['pk'])

        if not user.has_perm(LINK_DELETE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        link = NewsPostTranslationLink.get_by_id(link_pk)
        if not link:
            return RESPONSE_404_NOT_FOUND

        is_translation = link.translation.id == translation_pk
        is_post = link.translation.post.id == post_pk
        if not is_translation or not is_post:
            return RESPONSE_404_NOT_FOUND_RELATED_OBJECT

        is_delete = NewsPostTranslationLink.delete_by_id(link_pk)
        if not is_delete:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return RESPONSE_200_DELETED
