"""
Module that contains the core logic for interaction with the Google My Business API.
"""

import requests

from googlemybusiness.provider import GOOGLE_MY_BUSINESS_OAUTH_PROVIDER
from googlemybusiness.models import GoogleMyBusinessAccount
from utils.logger import LOGGER


def api_call(api_call_method):
    """
    Decorator that wraps each method that makes calls to the Google API and updates
    the access token when token is expired.
    """

    def prepared_api_call(api_service: "GoogleMyBusinessAPIService", user, *args, **kwargs):
        """Wrapper for API method."""

        if api_service.oauth_provider.is_access_token_expired(user):
            refresh_token = api_service.oauth_provider.get_refresh_token(user)
            api_service.oauth_provider.refresh_token(user, refresh_token)
        return api_call_method(api_service, user, *args, **kwargs)

    return prepared_api_call


class GoogleMyBusinessAPIService:
    """
    Class that represents the Google My Business API service.
    It tightly relates to the library Google Business entity and allows to access
    this library resources even the library site's user has appropriate permissions
    """

    GOOGLE_MY_BUSINESS_PATH = "https://mybusiness.googleapis.com/v4/"
    LIBRARY_LOCATION_PATH = "locations/14359245960912191740/"
    POSTS_PATH = "localPosts/"
    ACCOUNTS_PATH = "accounts/"

    def __init__(self):
        self.oauth_provider = GOOGLE_MY_BUSINESS_OAUTH_PROVIDER

    @api_call
    def create_post(self, user, post_data):
        """
        Method that send creation POST request to the Google My Business
        localPost/ API endpoint.
        :param user: CustomUser that represents the current session user.
        :param post_data: dict that represents the payload to send to
        the Google service API.
        :return: dict with created post data or None.
        """
        access_token = self.oauth_provider.get_access_token(user)
        if not access_token:
            LOGGER.error(
                f"Cannot retrieve access token for user: {user} "
                f"during the Google My Business post creation."
            )
            return None

        service_account_name = GoogleMyBusinessAccount.get_account_service_name(user)
        if not service_account_name:
            LOGGER.error(
                f"Cannot retrieve Google service account name for user: {user} "
                f"during the Google My Business post creation."
            )
            return None

        posts_endpoint = f"{self.LIBRARY_LOCATION_PATH}{self.POSTS_PATH}"
        headers = {"Authorization": f"Bearer {access_token}"}
        response = requests.post(
            url=f"{self.GOOGLE_MY_BUSINESS_PATH}{service_account_name}/{posts_endpoint}",
            json=post_data,
            headers=headers,
        )
        if not response:
            LOGGER.error(
                f"Failed to create Google My Business post. "
                f"User: {user} Data: {post_data} Failed API response: {response.text}"
            )
            return None

        return response.json()

    @api_call
    def get_account(self, user):
        """
        Method that retrieves the Google My Business account for the current session user.
        :param user: CustomUser that represents the current session user.
        :return: dict with data that represents Google My Business service account.
        """
        access_token = self.oauth_provider.get_access_token(user)
        if not access_token:
            LOGGER.error(
                f"Cannot retrieve access token for user: {user} "
                f"during the Google My Business account retrieving."
            )
            return None

        headers = {"Authorization": f"Bearer {access_token}"}
        response = requests.get(
            url=f"{self.GOOGLE_MY_BUSINESS_PATH}{self.ACCOUNTS_PATH}", headers=headers
        )
        if not response:
            LOGGER.error(
                f"Failed to retrieve Google My Business account. "
                f"User: {user} Failed API response: {response.text}"
            )
            return None

        try:
            return response.json().get("accounts", []).pop()
        except IndexError as err:
            LOGGER.error(
                f"There is no any Google My Business account for User: {user} Error: {err}"
            )
            return None


GOOGLE_MY_BUSINESS_API_SERVICE = GoogleMyBusinessAPIService()
