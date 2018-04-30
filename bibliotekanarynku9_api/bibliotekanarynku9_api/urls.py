"""
bibliotekanarynku9_api URL Configuration

The root url configuration for bibliotekanarynku9_api project.
The entrypoint to url tree of project.
"""

from rest_framework import routers
from admin.views import AdminViewSet
from authentication.views import AuthenticationViewSet


router = routers.SimpleRouter(trailing_slash=False)
router.register(r'auth', AuthenticationViewSet, 'authentication')
router.register(r'admin', AdminViewSet, 'admin')

urlpatterns = router.urls
