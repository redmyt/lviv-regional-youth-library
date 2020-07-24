"""
Module that contains the core logic for interaction with the Google My Business API.
"""

import requests
from django.db import transaction

from announcement.converters import LOCATION_POST
from googlemybusiness.exceptions import (
    GoogleMyBusinessAccountIntegrityError,
    GoogleMyBusinessParsingError,
    GoogleMyBusinessServerError,
    GoogleMyBusinessServiceConnectionError,
)
from googlemybusiness.provider import GoogleMyBusinessOAuthProvider
from googlemybusiness.models import GoogleMyBusinessAccount
from utils.logger import LOGGER


def api_call(api_call_method):
    """
    Decorator that wraps each method that makes calls to the Google API. Is checks has
    API service been connected and updates the access token when token is expired.
    """

    def prepared_api_call(api_service: "GoogleMyBusinessAPIService", *args, **kwargs):
        """Wrapper for API method."""
        if not api_service.is_service_connected():
            raise GoogleMyBusinessServiceConnectionError

        if api_service.oauth_provider.is_access_token_expired():
            api_service.oauth_provider.refresh_access_token()

        return api_call_method(api_service, *args, **kwargs)

    return prepared_api_call


class GoogleMyBusinessAPIService:
    """
    Class that represents the Google My Business API service.
    It tightly relates to the library Google Business entity and allows to access
    this library resources only if the library site's user has appropriate permissions.
    """

    GOOGLE_MY_BUSINESS_PATH = "https://mybusiness.googleapis.com/v4/"
    LIBRARY_LOCATION_PATH = "locations/14359245960912191740/"
    ACCOUNTS_PATH = "accounts/"
    POSTS_PATH = "localPosts/"

    def __init__(self):
        self.oauth_provider = GoogleMyBusinessOAuthProvider()

    @property
    def account_name(self):
        return GoogleMyBusinessAccount.get_account_service_name(self.oauth_provider.email)

    def is_service_connected(self):
        return self.oauth_provider.is_service_session_exist()

    def get_authorize_url(self):
        return self.oauth_provider.authorize_url

    def connect(self, auth_code):
        credentials = self.oauth_provider.generate_oauth_session_credentials(auth_code=auth_code)
        google_business_account = self.get_account(credentials.access_token)
        with transaction.atomic():
            self.oauth_provider.save_oauth_session_credentials(credentials)
            self.save_google_business_account(google_business_account)

    @api_call
    def create_post(self, post_data: LOCATION_POST):
        """
        Method that send creation POST request to the Google My Business
        localPost/ API endpoint.
        :param post_data: payload to send to the Google service API.
        :return: created Google My Business post.
        """
        posts_endpoint = f"{self.LIBRARY_LOCATION_PATH}{self.POSTS_PATH}"
        response = requests.post(
            url=f"{self.GOOGLE_MY_BUSINESS_PATH}{self.account_name}/{posts_endpoint}",
            json=post_data,
            headers={"Authorization": f"Bearer {self.oauth_provider.access_token}"},
        )
        if not response:
            LOGGER.error(
                f"Failed to create Google My Business post. "
                f"Email: {self.oauth_provider.email} Data: {post_data} "
                f"Failed API response: {response.text}"
            )
            raise GoogleMyBusinessServerError
        return response.json()

    @api_call
    def delete_post(self, post_name: str):
        """
        Method that send deletion DELETE request to the Google My Business
        localPost/ API endpoint.
        :param post_name: string that represents the post name at Google Business API.
        :return: boolean mark of operation success.
        """
        response = requests.delete(
            url=f"{self.GOOGLE_MY_BUSINESS_PATH}{post_name}",
            headers={"Authorization": f"Bearer {self.oauth_provider.access_token}"},
        )
        if not response:
            LOGGER.error(
                f"Failed to remove Google My Business post. "
                f"User: {self.oauth_provider.email} Data: {post_name} "
                f"Failed API response: {response.text}"
            )
            return GoogleMyBusinessServerError
        return True

    def get_account(self, access_token):
        """
        Method that retrieves the Google My Business account for the accepted access token.
        :param access_token: access_token that associates with
        the certain Google My Business account.
        :return: data that represents Google My Business service account.
        """
        response = requests.get(
            url=f"{self.GOOGLE_MY_BUSINESS_PATH}{self.ACCOUNTS_PATH}",
            headers={"Authorization": f"Bearer {access_token}"},
        )
        if not response:
            LOGGER.error(
                f"Failed to retrieve Google My Business account. "
                f"Failed API response: {response.text}"
            )
            raise GoogleMyBusinessServerError(response.text)

        try:
            return response.json().get("accounts", []).pop()
        except IndexError as err:
            LOGGER.error(
                f"There is no any Google My Business account for accepted token. Error: {err}"
            )
            raise GoogleMyBusinessParsingError

    def save_google_business_account(self, account):
        saved_service_account = GoogleMyBusinessAccount.create(
            {
                "email": self.oauth_provider.email,
                "service_name": account["name"],
                "account_name": account["accountName"],
            }
        )
        if not saved_service_account:
            LOGGER.error(f"Cannot save Google My Business account to database. Account: {account}")
            raise GoogleMyBusinessAccountIntegrityError(account)
        return saved_service_account


GOOGLE_MY_BUSINESS_API_SERVICE = GoogleMyBusinessAPIService()
