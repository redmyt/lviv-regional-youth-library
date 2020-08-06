"""Module that describes the PressPost controller logic."""

from rest_framework import viewsets
from rest_framework.response import Response
from presspost.models import (PressPost,
                              PressPostTranslation,
                              PressPostTranslationLink)
from presspost.serializers import (PressPostSerializer,
                                   PressPostTranslationSerializer,
                                   PressPostTranslationLinkSerializer)
from utils.handlers import IMAGES_HANDLER
from utils.responses import (RESPONSE_200_DELETED,
                             RESPONSE_204_UPDATED,
                             RESPONSE_400_DB_INTEGRATION_FAILURE,
                             RESPONSE_403_PERMISSIONS_REQUIRED,
                             RESPONSE_400_INVALID_DATA,
                             RESPONSE_404_NOT_FOUND_RELATED_OBJECT,
                             RESPONSE_404_NOT_FOUND)


POST_CREATE_PERM = 'presspost.add_presspost'
POST_UPDATE_PERM = 'presspost.change_presspost'
POST_DELETE_PERM = 'presspost.delete_presspost'
TRANSLATION_CREATE_PERM = 'presspost.add_pressposttranslation'
TRANSLATION_UPDATE_PERM = 'presspost.change_pressposttranslation'
TRANSLATION_DELETE_PERM = 'presspost.delete_pressposttranslation'
LINK_CREATE_PERM = 'presspost.add_pressposttranslationlink'
LINK_UPDATE_PERM = 'presspost.change_pressposttranslationlink'
LINK_DELETE_PERM = 'presspost.delete_pressposttranslationlink'


class PressPostViewSet(viewsets.ModelViewSet):
    """A viewset for applying the CRUD operation on PressPost instances."""

    serializer_class = PressPostSerializer
    queryset = PressPost.objects.all()

    def create(self, request, *args, **kwargs):
        """POST request logic."""

        user = request.user
        if not user.has_perm(POST_CREATE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        ppost_data = request.data
        ppost_data['avatar'] = IMAGES_HANDLER.save_image(ppost_data.get('avatar'))
        serializer = PressPostSerializer(data=ppost_data)

        if not serializer.is_valid():
            return RESPONSE_400_INVALID_DATA

        ppost = serializer.save()
        if not ppost:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return Response(serializer.data, status=201)

    def update(self, request, **kwargs):
        """PUT request logic."""

        user = request.user
        ppost_pk = int(kwargs['pk'])

        if not user.has_perm(POST_UPDATE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        ppost = PressPost.get_by_id(ppost_pk)
        if not ppost:
            return RESPONSE_404_NOT_FOUND

        ppost_data = request.data
        ppost_avatar = IMAGES_HANDLER.save_image(ppost_data.get('avatar'))
        if ppost_avatar:
            ppost_data['avatar'] = ppost_avatar
        serializer = PressPostSerializer(ppost, data=ppost_data, partial=True)

        if not serializer.is_valid():
            return RESPONSE_400_INVALID_DATA

        IMAGES_HANDLER.remove_image(ppost.avatar)
        ppost = serializer.save()
        if not ppost:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return RESPONSE_204_UPDATED

    def destroy(self, request, **kwargs):
        """DELETE request logic."""

        user = request.user
        ppost_pk = int(kwargs['pk'])

        if not user.has_perm(POST_DELETE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        ppost = PressPost.get_by_id(ppost_pk)
        if not ppost:
            return RESPONSE_404_NOT_FOUND

        avatar = ppost.avatar
        is_delete = PressPost.delete_by_id(ppost_pk)
        if not is_delete:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        IMAGES_HANDLER.remove_image(avatar)
        return RESPONSE_200_DELETED


class PressPostTranslationViewSet(viewsets.ModelViewSet):
    """
    A viewset for applying the CRUD operation on PressPostTranslation
    instances.
    """

    serializer_class = PressPostTranslationSerializer

    def get_queryset(self):
        """Add language filter to the base pressposttranslation queryset."""

        ppost_pk = int(self.kwargs['press_post_pk'])
        return PressPostTranslation.objects.filter(post=ppost_pk)

    def create(self, request, *args, **kwargs):
        """POST request logic."""

        user = request.user
        ppost_pk = int(kwargs['press_post_pk'])
        if not user.has_perm(TRANSLATION_CREATE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        ppost_transl_data = {'post': ppost_pk, **request.data}
        serializer = PressPostTranslationSerializer(data=ppost_transl_data)

        if not serializer.is_valid():
            return RESPONSE_400_INVALID_DATA

        ppost_transl = serializer.save()
        if not ppost_transl:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return Response(serializer.data, 201)

    def update(self, request, **kwargs):
        """PUT request logic."""

        user = request.user
        ppost_pk = int(kwargs['press_post_pk'])
        ppost_transl_pk = int(kwargs['pk'])

        if not user.has_perm(TRANSLATION_UPDATE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        ppost_transl = PressPostTranslation.get_by_id(ppost_transl_pk)
        if not ppost_transl:
            return RESPONSE_404_NOT_FOUND

        if not ppost_transl.post.id == ppost_pk:
            return RESPONSE_404_NOT_FOUND_RELATED_OBJECT

        ppost_transl_data = request.data
        serializer = PressPostTranslationSerializer(
            ppost_transl,
            data=ppost_transl_data,
            partial=True)

        if not serializer.is_valid():
            return RESPONSE_400_INVALID_DATA

        ppost_transl = serializer.save()
        if not ppost_transl:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return RESPONSE_204_UPDATED

    def destroy(self, request, **kwargs):
        """DELETE request logic."""

        user = request.user
        ppost_pk = int(kwargs['press_post_pk'])
        transl_pk = int(kwargs['pk'])

        if not user.has_perm(TRANSLATION_DELETE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        ppost_transl = PressPostTranslation.get_by_id(transl_pk)
        if not ppost_transl:
            return RESPONSE_404_NOT_FOUND

        if not ppost_transl.post.id == ppost_pk:
            return RESPONSE_404_NOT_FOUND_RELATED_OBJECT

        is_delete = PressPostTranslation.delete_by_id(transl_pk)
        if not is_delete:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return RESPONSE_200_DELETED


class PressPostTranslationLinkViewSet(viewsets.ModelViewSet):
    """
    A viewset for applying the CRUD operation on
    PressPostTranslationLink instances.
    """

    serializer_class = PressPostTranslationLinkSerializer

    def get_queryset(self):
        """
        Add the certain translation and post filter to the base
        pressposttranslationlink queryset.
        """

        ppost_pk = int(self.kwargs['press_post_pk'])
        ppost_transl_pk = int(self.kwargs['translation_pk'])

        queryset = PressPostTranslationLink.objects.filter(
            translation=ppost_transl_pk,
            translation__post=ppost_pk)
        return queryset

    def create(self, request, *args, **kwargs):
        """POST request logic."""

        user = request.user
        ppost_pk = int(kwargs['press_post_pk'])
        ppost_transl_pk = int(kwargs['translation_pk'])

        if not user.has_perm(LINK_CREATE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        ppost_transl = PressPostTranslation.get_by_id(ppost_transl_pk)

        if not ppost_transl:
            return RESPONSE_404_NOT_FOUND_RELATED_OBJECT

        if not ppost_transl.post.id == ppost_pk:
            return RESPONSE_404_NOT_FOUND_RELATED_OBJECT

        data = {'translation': ppost_transl_pk, **request.data}
        serializer = PressPostTranslationLinkSerializer(data=data)

        if not serializer.is_valid():
            return RESPONSE_400_INVALID_DATA

        ppost_link = serializer.save()
        if not ppost_link:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return Response(serializer.data, 201)

    def update(self, request, **kwargs):
        """PUT request logic."""

        user = request.user
        ppost_pk = int(kwargs['press_post_pk'])
        ppost_transl_pk = int(kwargs['translation_pk'])
        ppost_link_pk = int(kwargs['pk'])

        if not user.has_perm(LINK_UPDATE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        ppost_link = PressPostTranslationLink.get_by_id(ppost_link_pk)
        if not ppost_link:
            return RESPONSE_404_NOT_FOUND

        is_ppost_transl = ppost_link.translation.id == ppost_transl_pk
        is_ppost = ppost_link.translation.post.id == ppost_pk
        if not is_ppost_transl or not is_ppost:
            return RESPONSE_404_NOT_FOUND_RELATED_OBJECT

        data = request.data
        serializer = PressPostTranslationLinkSerializer(
            ppost_link,
            data=data,
            partial=True)

        if not serializer.is_valid():
            return RESPONSE_400_INVALID_DATA

        ppost_link = serializer.save()
        if not ppost_link:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return RESPONSE_204_UPDATED

    def destroy(self, request, **kwargs):
        """DELETE request logic."""

        user = request.user
        ppost_pk = int(kwargs['press_post_pk'])
        ppost_transl_pk = int(kwargs['translation_pk'])
        ppost_link_pk = int(kwargs['pk'])

        if not user.has_perm(LINK_DELETE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        ppost_link = PressPostTranslationLink.get_by_id(ppost_link_pk)
        if not ppost_link:
            return RESPONSE_404_NOT_FOUND

        is_ppost_transl = ppost_link.translation.id == ppost_transl_pk
        is_ppost = ppost_link.translation.post.id == ppost_pk
        if not is_ppost_transl or not is_ppost:
            return RESPONSE_404_NOT_FOUND_RELATED_OBJECT

        is_delete = PressPostTranslationLink.delete_by_id(ppost_link_pk)
        if not is_delete:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return RESPONSE_200_DELETED
