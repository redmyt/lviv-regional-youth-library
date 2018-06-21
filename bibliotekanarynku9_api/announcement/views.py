"""Module that describes the Announcement controller logic."""

from rest_framework import viewsets
from rest_framework.response import Response
from announcement.models import (Announcement,
                                 AnnouncementTranslation,
                                 AnnouncementTranslationLink)
from announcement.serializers import (AnnouncementSerializer,
                                      AnnouncementTranslationSerializer,
                                      AnnouncementTranslationLinkSerializer)
from utils.handlers import IMAGE_HANDLER
from utils.responses import (RESPONSE_200_DELETED,
                             RESPONSE_204_UPDATED,
                             RESPONSE_400_DB_INTEGRATION_FAILURE,
                             RESPONSE_400_INVALID_DATA,
                             RESPONSE_403_PERMISSIONS_REQUIRED,
                             RESPONSE_404_NOT_FOUND,
                             RESPONSE_404_NOT_FOUND_RELATED_OBJECT)


POST_CREATE_PERM = 'announcement.add_announcement'
POST_UPDATE_PERM = 'announcement.change_announcement'
POST_DELETE_PERM = 'announcement.delete_announcement'
TRANSLATION_CREATE_PERM = 'announcement.add_announcementtranslation'
TRANSLATION_UPDATE_PERM = 'announcement.change_announcementtranslation'
TRANSLATION_DELETE_PERM = 'announcement.delete_announcementtranslation'
LINK_CREATE_PERM = 'announcement.add_announcementtranslationlink'
LINK_UPDATE_PERM = 'announcement.change_announcementtranslationlink'
LINK_DELETE_PERM = 'announcement.delete_announcementtranslationlink'


class AnnouncementViewSet(viewsets.ModelViewSet):
    """A viewset for applying the CRUD operation on Announcement instances."""

    serializer_class = AnnouncementSerializer
    queryset = Announcement.objects.all()

    def create(self, request, *args, **kwargs):
        """POST request logic."""

        user = request.user
        if not user.has_perm(POST_CREATE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        ann_data = request.data
        ann_data['avatar'] = IMAGE_HANDLER.parse(ann_data.get('avatar'))
        serializer = AnnouncementSerializer(data=ann_data)

        if not serializer.is_valid():
            return RESPONSE_400_INVALID_DATA

        ann = serializer.save()
        if not ann:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return Response(serializer.data, status=201)

    def update(self, request, **kwargs):
        """PUT request logic."""

        user = request.user
        ann_pk = int(kwargs['pk'])

        if not user.has_perm(POST_UPDATE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        ann = Announcement.get_by_id(ann_pk)
        if not ann:
            return RESPONSE_404_NOT_FOUND

        ann_data = request.data
        serializer = AnnouncementSerializer(ann, data=ann_data, partial=True)

        if not serializer.is_valid():
            return RESPONSE_400_INVALID_DATA

        ann = serializer.save()
        if not ann:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return RESPONSE_204_UPDATED

    def destroy(self, request, **kwargs):
        """DELETE request logic."""

        user = request.user
        ann_pk = int(kwargs['pk'])

        if not user.has_perm(POST_DELETE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        ann = Announcement.get_by_id(ann_pk)
        if not ann:
            return RESPONSE_404_NOT_FOUND

        avatar = ann.avatar
        is_delete = Announcement.delete_by_id(ann_pk)
        if not is_delete:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        IMAGE_HANDLER.remove_image(avatar)
        return RESPONSE_200_DELETED


class AnnouncementTranslationViewSet(viewsets.ModelViewSet):
    """
    A viewset for applying the CRUD operation on AnnouncementTranslation
    instances.
    """

    serializer_class = AnnouncementTranslationSerializer

    def get_queryset(self):
        """
        Add the certain announcement filter to the base
        Announcementtranslation queryset.
        """

        ann_pk = int(self.kwargs['announcement_pk'])
        return AnnouncementTranslation.objects.filter(announcement=ann_pk)

    def create(self, request, *args, **kwargs):
        """POST request logic."""

        user = request.user
        ann_pk = int(kwargs['announcement_pk'])
        if not user.has_perm(TRANSLATION_CREATE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        ann_transl_data = {'announcement': ann_pk, **request.data}
        serializer = AnnouncementTranslationSerializer(data=ann_transl_data)

        if not serializer.is_valid():
            return RESPONSE_400_INVALID_DATA

        ann_transl = serializer.save()
        if not ann_transl:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return Response(serializer.data, 201)

    def update(self, request, **kwargs):
        """PUT request logic."""

        user = request.user
        ann_pk = int(kwargs['announcement_pk'])
        ann_transl_pk = int(kwargs['pk'])

        if not user.has_perm(TRANSLATION_UPDATE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        ann_transl = AnnouncementTranslation.get_by_id(ann_transl_pk)
        if not ann_transl:
            return RESPONSE_404_NOT_FOUND

        if not ann_transl.announcement.id == ann_pk:
            return RESPONSE_404_NOT_FOUND_RELATED_OBJECT

        ann_transl_data = request.data
        serializer = AnnouncementTranslationSerializer(
            ann_transl,
            data=ann_transl_data,
            partial=True)

        if not serializer.is_valid():
            return RESPONSE_400_INVALID_DATA

        ann_transl = serializer.save()
        if not ann_transl:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return RESPONSE_204_UPDATED

    def destroy(self, request, **kwargs):
        """DELETE request logic."""

        user = request.user
        ann_pk = int(kwargs['announcement_pk'])
        ann_transl_pk = int(kwargs['pk'])

        if not user.has_perm(TRANSLATION_DELETE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        ann_transl = AnnouncementTranslation.get_by_id(ann_transl_pk)
        if not ann_transl:
            return RESPONSE_404_NOT_FOUND

        if not ann_transl.announcement.id == ann_pk:
            return RESPONSE_404_NOT_FOUND_RELATED_OBJECT

        is_delete = AnnouncementTranslation.delete_by_id(ann_transl_pk)
        if not is_delete:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return RESPONSE_200_DELETED


class AnnouncementTranslationLinkViewSet(viewsets.ModelViewSet):
    """
    A viewset for applying the CRUD operation on
    AnnouncementTranslationLink instances.
    """

    serializer_class = AnnouncementTranslationLinkSerializer

    def get_queryset(self):
        """
        Add the certain translation and post filter to the base
        Announcementtranslationlink queryset.
        """

        ann_pk = int(self.kwargs['announcement_pk'])
        ann_transl_pk = int(self.kwargs['translation_pk'])

        queryset = AnnouncementTranslationLink.objects.filter(
            translation=ann_transl_pk,
            translation__announcement=ann_pk)
        return queryset

    def create(self, request, *args, **kwargs):
        """POST request logic."""

        user = request.user
        ann_pk = int(kwargs['announcement_pk'])
        ann_transl_pk = int(kwargs['translation_pk'])

        if not user.has_perm(LINK_CREATE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        ann_transl = AnnouncementTranslation.get_by_id(ann_transl_pk)
        if not ann_transl:
            return RESPONSE_404_NOT_FOUND

        if not ann_transl.announcement.id == ann_pk:
            return RESPONSE_404_NOT_FOUND_RELATED_OBJECT

        ann_link_data = {'translation': ann_transl_pk, **request.data}
        serializer = AnnouncementTranslationLinkSerializer(data=ann_link_data)

        if not serializer.is_valid():
            return RESPONSE_400_INVALID_DATA

        ann_link = serializer.save()
        if not ann_link:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return Response(serializer.data, 201)

    def update(self, request, **kwargs):
        """PUT request logic."""

        user = request.user
        ann_pk = int(kwargs['announcement_pk'])
        ann_transl_pk = int(kwargs['translation_pk'])
        ann_transl_link_pk = int(kwargs['pk'])

        if not user.has_perm(LINK_UPDATE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        ann_link = AnnouncementTranslationLink.get_by_id(ann_transl_link_pk)
        if not ann_link:
            return RESPONSE_404_NOT_FOUND

        is_translation = ann_link.translation.id == ann_transl_pk
        is_announcement = ann_link.translation.announcement.id == ann_pk
        if not is_translation or not is_announcement:
            return RESPONSE_404_NOT_FOUND_RELATED_OBJECT

        ann_link_data = request.data
        serializer = AnnouncementTranslationLinkSerializer(
            ann_link,
            data=ann_link_data,
            partial=True)

        if not serializer.is_valid():
            return RESPONSE_400_INVALID_DATA

        ann_link = serializer.save()
        if not ann_link:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return RESPONSE_204_UPDATED

    def destroy(self, request, **kwargs):
        """DELETE request logic."""

        user = request.user
        ann_pk = int(kwargs['announcement_pk'])
        ann_transl_pk = int(kwargs['translation_pk'])
        ann_transl_link_pk = int(kwargs['pk'])

        if not user.has_perm(LINK_DELETE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        ann_link = AnnouncementTranslationLink.get_by_id(ann_transl_link_pk)
        if not ann_link:
            return RESPONSE_404_NOT_FOUND

        is_translation = ann_link.translation.id == ann_transl_pk
        is_announcement = ann_link.translation.announcement.id == ann_pk
        if not is_translation or not is_announcement:
            return RESPONSE_404_NOT_FOUND_RELATED_OBJECT

        is_delete = AnnouncementTranslationLink.delete_by_id(ann_transl_link_pk)
        if not is_delete:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return RESPONSE_200_DELETED
