"""Module that describes the Project controller logic."""

from rest_framework import viewsets
from rest_framework.response import Response
from project.models import (Project,
                            ProjectTranslation,
                            ProjectTranslationLink)
from project.serializers import (ProjectSerializer,
                                 ProjectTranslationSerializer,
                                 ProjectTranslationLinkSerializer)
from utils.handlers import IMAGE_HANDLER
from utils.responses import (RESPONSE_200_DELETED,
                             RESPONSE_204_UPDATED,
                             RESPONSE_400_INVALID_DATA,
                             RESPONSE_404_NOT_FOUND_RELATED_OBJECT,
                             RESPONSE_400_DB_INTEGRATION_FAILURE,
                             RESPONSE_403_PERMISSIONS_REQUIRED,
                             RESPONSE_404_NOT_FOUND)


POST_CREATE_PERM = 'project.add_project'
POST_UPDATE_PERM = 'project.change_project'
POST_DELETE_PERM = 'project.delete_project'
TRANSLATION_CREATE_PERM = 'project.add_projecttranslation'
TRANSLATION_UPDATE_PERM = 'project.change_projecttranslation'
TRANSLATION_DELETE_PERM = 'project.delete_projecttranslation'
LINK_CREATE_PERM = 'project.add_projecttranslationlink'
LINK_UPDATE_PERM = 'project.change_projecttranslationlink'
LINK_DELETE_PERM = 'project.delete_projecttranslationlink'


class ProjectViewSet(viewsets.ModelViewSet):
    """A viewset for applying the CRUD operation on Project instances."""

    serializer_class = ProjectSerializer
    queryset = Project.objects.all()

    def create(self, request, *args, **kwargs):
        """POST request logic."""

        user = request.user
        if not user.has_perm(POST_CREATE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        proj_data = request.data
        proj_data['avatar'] = IMAGE_HANDLER.parse(proj_data.get('avatar'))
        serializer = ProjectSerializer(data=proj_data)

        if not serializer.is_valid():
            return RESPONSE_400_INVALID_DATA

        proj = serializer.save()
        if not proj:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return Response(serializer.data, status=201)

    def update(self, request, **kwargs):
        """PUT request logic."""

        user = request.user
        proj_pk = int(kwargs['pk'])

        if not user.has_perm(POST_UPDATE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        proj = Project.get_by_id(proj_pk)
        if not proj:
            return RESPONSE_404_NOT_FOUND

        proj_data = request.data
        proj_avatar = IMAGE_HANDLER.parse(proj_data.get('avatar'))
        if proj_avatar:
            proj_data['avatar'] = proj_avatar
        serializer = ProjectSerializer(proj, data=proj_data, partial=True)

        if not serializer.is_valid():
            return RESPONSE_400_INVALID_DATA

        IMAGE_HANDLER.remove_image(proj.avatar)
        proj = serializer.save()
        if not proj:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return RESPONSE_204_UPDATED

    def destroy(self, request, **kwargs):
        """DELETE request logic."""

        user = request.user
        proj_pk = int(kwargs['pk'])

        if not user.has_perm(POST_DELETE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        proj = Project.get_by_id(proj_pk)
        if not proj:
            return RESPONSE_404_NOT_FOUND

        avatar = proj.avatar
        is_delete = Project.delete_by_id(proj_pk)
        if not is_delete:
            return RESPONSE_404_NOT_FOUND

        IMAGE_HANDLER.remove_image(avatar)
        return RESPONSE_200_DELETED


class ProjectTranslationViewSet(viewsets.ModelViewSet):
    """
    A viewset for applying the CRUD operation on ProjectTranslation
    instances.
    """

    serializer_class = ProjectTranslationSerializer

    def get_queryset(self):
        """
        Add the certain project filter to the base projecttranslation
        queryset.
        """

        proj_pk = int(self.kwargs['project_pk'])
        return ProjectTranslation.objects.filter(project=proj_pk)

    def create(self, request, *args, **kwargs):
        """POST request logic."""

        user = request.user
        proj_pk = int(kwargs['project_pk'])
        if not user.has_perm(TRANSLATION_CREATE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        proj_data = {'project': proj_pk, **request.data}
        serializer = ProjectTranslationSerializer(data=proj_data)

        if not serializer.is_valid():
            return RESPONSE_400_INVALID_DATA

        proj_transl = serializer.save()
        if not proj_transl:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return Response(serializer.data, 201)

    def update(self, request, **kwargs):
        """PUT request logic."""

        user = request.user
        proj_pk = int(kwargs['project_pk'])
        proj_transl_pk = int(kwargs['pk'])

        if not user.has_perm(TRANSLATION_UPDATE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        proj_transl = ProjectTranslation.get_by_id(proj_transl_pk)
        if not proj_transl:
            return RESPONSE_404_NOT_FOUND

        if not proj_transl.proj.id == proj_pk:
            return RESPONSE_404_NOT_FOUND_RELATED_OBJECT

        proj_transl_data = request.data
        serializer = ProjectTranslationSerializer(
            proj_transl,
            data=proj_transl_data,
            partial=True)

        if not serializer.is_valid():
            return RESPONSE_400_INVALID_DATA

        proj_transl = serializer.save()
        if not proj_transl:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return RESPONSE_204_UPDATED

    def destroy(self, request, **kwargs):
        """DELETE request logic."""

        user = request.user
        proj_pk = int(kwargs['project_pk'])
        proj_transl_pk = int(kwargs['pk'])

        if not user.has_perm(TRANSLATION_DELETE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        proj_transl = ProjectTranslation.get_by_id(proj_transl_pk)
        if not proj_transl:
            return RESPONSE_404_NOT_FOUND

        if not proj_transl.proj.id == proj_pk:
            return RESPONSE_404_NOT_FOUND_RELATED_OBJECT

        is_delete = ProjectTranslation.delete_by_id(proj_transl_pk)
        if not is_delete:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return RESPONSE_200_DELETED


class ProjectTranslationLinkViewSet(viewsets.ModelViewSet):
    """
    A viewset for applying the CRUD operation on
    ProjectTranslationLink instances.
    """

    serializer_class = ProjectTranslationLinkSerializer

    def get_queryset(self):
        """
        Add the certain translation and project filter to the base
        projecttranslationlink queryset.
        """

        proj_pk = int(self.kwargs['project_pk'])
        proj_transl_pk = int(self.kwargs['translation_pk'])

        queryset = ProjectTranslationLink.objects.filter(
            translation=proj_transl_pk,
            translation__post=proj_pk)
        return queryset

    def create(self, request, *args, **kwargs):
        """POST request logic."""

        user = request.user
        proj_pk = int(kwargs['project_pk'])
        proj_transl_pk = int(kwargs['translation_pk'])

        if not user.has_perm(LINK_CREATE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        proj_transl = ProjectTranslation.get_by_id(proj_transl_pk)
        if not proj_transl:
            return RESPONSE_404_NOT_FOUND_RELATED_OBJECT

        if not proj_transl.post.id == proj_pk:
            return RESPONSE_404_NOT_FOUND_RELATED_OBJECT

        proj_link_data = {'translation': proj_transl_pk, **request.data}
        serializer = ProjectTranslationLinkSerializer(data=proj_link_data)

        if not serializer.is_valid():
            return RESPONSE_400_INVALID_DATA

        proj_link = serializer.save()
        if not proj_link:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return Response(serializer.data, 201)

    def update(self, request, **kwargs):
        """PUT request logic."""

        user = request.user
        proj_pk = int(kwargs['project_pk'])
        proj_transl_pk = int(kwargs['translation_pk'])
        proj_link_pk = int(kwargs['pk'])

        if not user.has_perm(LINK_UPDATE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        proj_link = ProjectTranslationLink.get_by_id(proj_link_pk)
        if not proj_link:
            return RESPONSE_404_NOT_FOUND

        is_translation = proj_link.translation.id == proj_transl_pk
        is_project = proj_link.translation.project.id == proj_pk
        if not is_translation or not is_project:
            return RESPONSE_404_NOT_FOUND_RELATED_OBJECT

        proj_link_data = request.data
        serializer = ProjectTranslationLinkSerializer(
            proj_link,
            data=proj_link_data,
            partial=True)

        if not serializer.is_valid():
            return RESPONSE_400_INVALID_DATA

        proj_link = serializer.save()
        if not proj_link:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return RESPONSE_204_UPDATED

    def destroy(self, request, **kwargs):
        """DELETE request logic."""

        user = request.user
        proj_pk = int(kwargs['project_pk'])
        proj_transl_pk = int(kwargs['translation_pk'])
        proj_link_pk = int(kwargs['pk'])

        if not user.has_perm(LINK_DELETE_PERM):
            return RESPONSE_403_PERMISSIONS_REQUIRED

        proj_link = ProjectTranslationLink.get_by_id(proj_link_pk)
        if not proj_link:
            return RESPONSE_404_NOT_FOUND

        is_translation = proj_link.translation.id == proj_transl_pk
        is_project = proj_link.translation.project.id == proj_pk
        if not is_translation or not is_project:
            return RESPONSE_404_NOT_FOUND_RELATED_OBJECT

        is_delete = ProjectTranslationLink.delete_by_id(proj_link_pk)
        if not is_delete:
            return RESPONSE_400_DB_INTEGRATION_FAILURE

        return RESPONSE_200_DELETED
