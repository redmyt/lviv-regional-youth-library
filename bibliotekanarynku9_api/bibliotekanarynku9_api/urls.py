"""
bibliotekanarynku9_api URL Configuration

The root url configuration for bibliotekanarynku9_api project.
The entrypoint to url tree of project.
"""

from rest_framework_nested import routers
from admin.views import AdminViewSet
from authentication.views import AuthenticationViewSet
from newspost.views import (NewsPostViewSet,
                            NewsPostTranslationViewSet,
                            NewsPostTranslationLinkViewSet)
from presspost.views import (PressPostViewSet,
                             PressPostTranslationLinkViewSet,
                             PressPostTranslationViewSet)


router = routers.SimpleRouter()

# Start points router

router.register(r'auth', AuthenticationViewSet, 'authentication')
router.register(r'admin', AdminViewSet, 'admin')
router.register(r'news_post', NewsPostViewSet, 'newspost')
router.register(r'press_post', PressPostViewSet, 'presspost')

urlpatterns = router.urls


# NewsPost app nested routers

newspost_router = routers.NestedSimpleRouter(
    router,
    r'news_post',
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


# PressPost app nested routers

presspost_router = routers.NestedSimpleRouter(
    router,
    r'press_post',
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
