"""Module that describes the NewsPost logic."""

from rest_framework import viewsets
from newspost.serializers import NewsPostTranslationSerializer
from newspost.models import NewsPostTranslation
from utils.language import get_request_language
from rest_framework.response import Response


class NewsPostViewSet(viewsets.ModelViewSet):
    """A viewset for viewing and editing NewsPost instances."""

    serializer_class = NewsPostTranslationSerializer
    queryset = NewsPostTranslation.objects.all()

    def get_queryset(self):
        lang = get_request_language(self.request)
        return NewsPostTranslation.objects.filter(language=lang)
