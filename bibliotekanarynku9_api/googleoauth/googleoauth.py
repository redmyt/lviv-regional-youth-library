"""
Module that represents logic of abstract Google OAuth flow provider.
Contains abstract class that facilitates base interaction with Google OAuth logic.
"""

from abc import ABC, abstractmethod
from collections import namedtuple
from datetime import datetime, timedelta, timezone
import requests

from django.conf import settings
from google_auth_oauthlib.flow import Flow
from oauthlib.oauth2.rfc6749.errors import OAuth2Error

from googleoauth.exceptions import (
    GoogleOAuthTokenGenerationError,
    GoogleOAuthRefreshTokenError,
    GoogleOAuthScopesDontMatchError,
)
from googleoauth.models import GoogleOAuthSession
from utils.logger import LOGGER


OAuthCredentials = namedtuple("credentials", ["access_token", "refresh_token", "expires_at"])

CLIENT_ID = settings.GOOGLE_APPLICATION_CREDENTIALS["web"]["client_id"]
CLIENT_SECRET = settings.GOOGLE_APPLICATION_CREDENTIALS["web"]["client_secret"]
REFRESH_GRANT_TYPE = "refresh_token"
REFRESH_TOKEN_URL = "https://oauth2.googleapis.com/token"


class GoogleOAuthProvider(ABC):
    """
    Abstract Base Class that defines the common operations with the Google OAuth flow.
    Contains methods that help go though the Google Auth Code grant flow.
    """

    @property
    @abstractmethod
    def email(self):
        pass

    @property
    @abstractmethod
    def service(self):
        pass

    @property
    @abstractmethod
    def scopes(self):
        pass

    @property
    def redirect_uri(self):
        auth_url, _ = self._flow.authorization_url()
        return auth_url

    @property
    def authorize_url(self):
        return self._flow.redirect_uri

    @property
    def access_token(self):
        return GoogleOAuthSession.get_service_access_token_by_email(self.service, self.email)

    @property
    def refresh_token(self):
        return GoogleOAuthSession.get_service_refresh_token_by_email(self.service, self.email)

    @property
    def _flow(self):
        return Flow.from_client_config(settings.GOOGLE_APPLICATION_CREDENTIALS, scopes=self.scopes)

    def is_service_session_exist(self):
        return bool(GoogleOAuthSession.get_service_session_by_email(self.service, self.email))

    def generate_oauth_session_credentials(self, auth_code):
        """
        Method that generates the Google OAuth credentials for the certain user using the
        accepted auth code. This method facilitates the final step of
        Auth Code grant type.
        :param auth_code: str that represents the auth code generated at previous flow step.
        """
        try:
            self._flow.fetch_token(code=auth_code)
            return OAuthCredentials(
                self._flow.credentials.token,
                self._flow.credentials.refresh_token,
                self._flow.credentials.expiry,
            )
        except OAuth2Error as err:
            LOGGER.error(
                f"Exception occurs during the token fetching for "
                f"service: {self.service} user: {self.email}. "
                f"Exception: {err}"
            )
            raise GoogleOAuthTokenGenerationError(self.service, self.email)

    def save_oauth_session_credentials(self, credentials: OAuthCredentials):
        oauth_session = GoogleOAuthSession.create(
            {
                "email": self.email,
                "service": self.service,
                "access_token": credentials.access_token,
                "refresh_token": credentials.refresh_token,
                "expires_at": credentials.expires_at,
            }
        )
        return oauth_session

    def is_access_token_expired(self):
        """
        Method that returns status of current user access token. Shows is token
        are valid in time slot.
        """

        expire_time = GoogleOAuthSession.get_access_token_expire_time(self.service, self.email)
        return datetime.now(tz=timezone.utc) > expire_time

    def refresh_access_token(self, refresh_token):
        """
        Method that refreshes the outdated access token for the certain user.
        :param refresh_token: str that represents the user's refresh token.
        """
        payload = {
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET,
            "refresh_token": refresh_token,
            "grant_type": REFRESH_GRANT_TYPE,
        }
        response = requests.post(REFRESH_TOKEN_URL, data=payload)
        if not response:
            LOGGER.error(
                f"Failed request to Google Auth for refresh access token. "
                f"Cannot refresh token for user: {self.email}"
            )
            raise GoogleOAuthRefreshTokenError(self.service, self.email)

        data = response.json()
        refreshed_access_token, expires_at, scope = (
            data.get("access_token"),
            self._get_expires_at_time(data.get("expires_in")),
            data.get("scope"),
        )
        if scope not in self.scopes:
            LOGGER.error(
                f"Failure during refreshing the access token for the user: {self.email}. "
                f"Received scope ({scope}) no match provide's scopes ({self.scopes})"
            )
            raise GoogleOAuthScopesDontMatchError(f"{self.scopes} not match to {scope}")

        return GoogleOAuthSession.update_service_access_token_by_email(
            self.service, self.email, refreshed_access_token, expires_at
        )

    @staticmethod
    def _get_expires_at_time(token_ttl: int) -> datetime:
        """
        Method that converts the accepted token TTL in seconds and returns the
        certain time when new access token will become invalid.
        """

        return datetime.now(tz=timezone.utc) + timedelta(seconds=token_ttl)
