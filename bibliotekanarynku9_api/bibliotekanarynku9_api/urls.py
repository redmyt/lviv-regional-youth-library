"""
bibliotekanarynku9_api URL Configuration

The root url configuration for bibliotekanarynku9_api project.
The entrypoint to url tree of project.
"""

from rest_framework_nested import routers
from admin.views import AdminViewSet
from authentication.views import AuthenticationViewSet
from newspost.views import NewsPostViewSet, NewsPostTranslationViewSet


router = routers.SimpleRouter(trailing_slash=False)

router.register(r'auth', AuthenticationViewSet, 'authentication')
router.register(r'admin', AdminViewSet, 'admin')
router.register(r'news_post', NewsPostViewSet, 'newspost')

newspost_router = routers.NestedSimpleRouter(router, r'news_post', lookup='news_post')
newspost_router.register(r'translation', NewsPostTranslationViewSet, 'newsposttranslation')

urlpatterns = router.urls
urlpatterns += newspost_router.urls
