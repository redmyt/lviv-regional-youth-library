"""
Module that contains set up logic for Google My Business OAuth provider.
This provider is specified direct to the My Business service.
"""

from django.conf import settings

from googleoauth.googleoauth import GoogleOAuthProvider
from googleoauth.utils import GoogleServices


GOOGLE_MY_BUSINESS_SCOPE = "https://www.googleapis.com/auth/business.manage"
GOOGLE_MY_BUSINESS_OAUTH_PROVIDER = GoogleOAuthProvider(
    GoogleServices.MY_BUSINESS.value,
    [GOOGLE_MY_BUSINESS_SCOPE],
    settings.GOOGLE_MY_BUSINESS_REDIRECT_URL,
)
