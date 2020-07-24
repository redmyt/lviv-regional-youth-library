"""
Module that contains defining logic for Google My Business OAuth provider.
This provider is specified direct to the My Business service.
"""

from django.conf import settings

from googleoauth.googleoauth import GoogleOAuthProvider
from googleoauth.utils import GoogleServices


class GoogleMyBusinessOAuthProvider(GoogleOAuthProvider):
    @property
    def email(self):
        return settings.GOOGLE_MY_BUSINESS_ADMINISTRATION_EMAIL

    @property
    def service(self):
        return GoogleServices.MY_BUSINESS.value

    @property
    def redirect_uri(self):
        return settings.GOOGLE_MY_BUSINESS_REDIRECT_URL

    @property
    def scopes(self):
        return [
            settings.GOOGLE_MY_BUSINESS_SCOPE,
        ]
