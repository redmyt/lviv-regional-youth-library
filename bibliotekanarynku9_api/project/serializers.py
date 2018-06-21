"""
Module that describes the serializers for the Project and
ProjectTranslation models
"""

from rest_framework import serializers
from project.models import Project, ProjectTranslation, ProjectTranslationLink
from utils.language import filter_serialized_translations


class ProjectTranslationLinkSerializer(serializers.ModelSerializer):
    """ProjectTranslationLinkSerializer model serializer."""

    class Meta:
        """Meta settings for serializer."""

        model = ProjectTranslationLink
        fields = '__all__'


class ProjectTranslationSerializer(serializers.ModelSerializer):
    """ProjectTranslationSerializer model serializer."""

    links = ProjectTranslationLinkSerializer(many=True, read_only=True)

    class Meta:
        """Meta settings for serializer."""

        model = ProjectTranslation
        fields = '__all__'


class ProjectSerializer(serializers.ModelSerializer):
    """ProjectSerializer model serializer."""

    translations = ProjectTranslationSerializer(many=True, read_only=True)

    class Meta:
        """Meta settings for serializer."""

        model = Project
        fields = '__all__'

    def to_representation(self, instance):
        """
        Overwrite method for filtering the output translation entities for the
        certain post according to the Accept-Language header from request.
        """

        proj_data = super().to_representation(instance)
        request = self.context.get('request')
        result = filter_serialized_translations(proj_data, request)
        return result
