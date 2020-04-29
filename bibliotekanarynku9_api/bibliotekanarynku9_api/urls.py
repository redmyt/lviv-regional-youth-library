"""
bibliotekanarynku9_api URL Configuration

The root url configuration for bibliotekanarynku9_api project.
The entrypoint to url tree of project.
"""

from django.conf import settings
from rest_framework_nested import routers
from admin.views import AdminViewSet
from authentication.views import AuthenticationViewSet
from announcement.views import (AnnouncementViewSet,
                                AnnouncementTranslationViewSet,
                                AnnouncementTranslationLinkViewSet)
from book.views import BookViewSet, BookTranslationViewSet
from newspost.views import (NewsPostViewSet,
                            NewsPostTranslationViewSet,
                            NewsPostTranslationLinkViewSet)
from presspost.views import (PressPostViewSet,
                             PressPostTranslationLinkViewSet,
                             PressPostTranslationViewSet)
from project.views import (ProjectViewSet,
                           ProjectTranslationViewSet,
                           ProjectTranslationLinkViewSet)
from googlemybusiness.views import GoogleMyBusinessViewSet


API_PREF = f'api/v{settings.API_VERSION}/'
router = routers.SimpleRouter()

# Start points router

router.register(API_PREF + 'auth', AuthenticationViewSet, 'authentication')
router.register(API_PREF + 'admin', AdminViewSet, 'admin')
router.register(API_PREF + 'news_post', NewsPostViewSet, 'newspost')
router.register(API_PREF + 'press_post', PressPostViewSet, 'presspost')
router.register(API_PREF + 'announcement', AnnouncementViewSet, 'announcement')
router.register(API_PREF + 'book', BookViewSet, 'book')
router.register(API_PREF + 'project', ProjectViewSet, 'project')
router.register(API_PREF + 'googlemybusiness', GoogleMyBusinessViewSet, 'googlemybusiness')

urlpatterns = router.urls


# NewsPost app nested routers

newspost_router = routers.NestedSimpleRouter(
    router,
    API_PREF + 'news_post',
    lookup='news_post')
newspost_router.register(
    r'translation',
    NewsPostTranslationViewSet,
    'newsposttranslation')
newspost_translation_router = routers.NestedSimpleRouter(
    newspost_router,
    r'translation',
    lookup='translation')
newspost_translation_router.register(
    r'link',
    NewsPostTranslationLinkViewSet,
    'newsposttranslationlink')

urlpatterns += newspost_router.urls
urlpatterns += newspost_translation_router.urls


# Book app nested routers

book_router = routers.NestedSimpleRouter(
    router,
    API_PREF + 'book',
    lookup='book')
book_router.register(
    r'translation',
    BookTranslationViewSet,
    'booktranslation')
book_translation_router = routers.NestedSimpleRouter(
    book_router,
    r'translation',
    lookup='translation')

urlpatterns += book_router.urls
urlpatterns += book_translation_router.urls


# Announcement app nested routers

announcement_router = routers.NestedSimpleRouter(
    router,
    API_PREF + 'announcement',
    lookup='announcement')
announcement_router.register(
    r'translation',
    AnnouncementTranslationViewSet,
    'announcementtranslation')
announcement_translation_router = routers.NestedSimpleRouter(
    announcement_router,
    r'translation',
    lookup='translation')
announcement_translation_router.register(
    r'link',
    AnnouncementTranslationLinkViewSet,
    'announcementtranslationlink')

urlpatterns += announcement_router.urls
urlpatterns += announcement_translation_router.urls


# PressPost app nested routers

presspost_router = routers.NestedSimpleRouter(
    router,
    API_PREF + 'press_post',
    lookup='press_post')
presspost_router.register(
    r'translation',
    PressPostTranslationViewSet,
    'pressposttranslation')
presspost_translation_router = routers.NestedSimpleRouter(
    presspost_router,
    r'translation',
    lookup='translation')
presspost_translation_router.register(
    r'link',
    PressPostTranslationLinkViewSet,
    'pressposttranslationlink')

urlpatterns += presspost_router.urls
urlpatterns += presspost_translation_router.urls


# Project app nested routers

project_router = routers.NestedSimpleRouter(
    router,
    API_PREF + 'project',
    lookup='project')
project_router.register(
    r'translation',
    ProjectTranslationViewSet,
    'projecttranslation')
project_translation_router = routers.NestedSimpleRouter(
    project_router,
    r'translation',
    lookup='translation')
project_translation_router.register(
    r'link',
    ProjectTranslationLinkViewSet,
    'projecttranslationlink')

urlpatterns += project_router.urls
urlpatterns += project_translation_router.urls
