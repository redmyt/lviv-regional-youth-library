"""
bibliotekanarynku9_api URL Configuration

The root url configuration for bibliotekanarynku9_api project.
The entrypoint to url tree of project.
"""

from rest_framework import routers
from authentication.views import AuthenticationViewSet


router = routers.SimpleRouter(trailing_slash=False)
router.register(r'auth', AuthenticationViewSet, 'authentication')

urlpatterns = router.urls
