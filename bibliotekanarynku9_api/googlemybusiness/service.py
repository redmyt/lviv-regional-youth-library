"""
Module that contains the core logic for interaction with the Google My Business API.
"""

# pylint: disable=C0330
# (Wrong hanging indentation before block) it's a known pylint issue.
# It is caused by Black file formatter in this case

from typing import Dict
import requests

from announcement.converters import LOCATION_POST
from customuser.models import CustomUser
from googlemybusiness.provider import GOOGLE_MY_BUSINESS_OAUTH_PROVIDER
from googlemybusiness.models import GoogleMyBusinessAccount
from utils.logger import LOGGER


class RequestHandler:
    """
    Class for facilitating the requests for calling Google Business API.
    """

    def __init__(self, api_service: "GoogleMyBusinessAPIService", user: CustomUser) -> None:
        self.api_service: "GoogleMyBusinessAPIService" = api_service
        self.user: CustomUser = user
        self.headers: Dict[str, str] = self.prepare_request_headers()
        self.account_name: str = self.retrieve_request_account_name()

    def prepare_request_headers(self) -> Dict[str, str]:
        """
        Method that builds the headers object  that will be used for request the
        Google Business API.
        """

        return {"Authorization": f"Bearer {self.retrieve_request_access_token()}"}

    def retrieve_request_access_token(self) -> str:
        """
        Method that retrieves user's access token before request to
        Google Business API.
        """

        access_token = self.api_service.oauth_provider.get_access_token(self.user)
        if not access_token:
            LOGGER.error(
                f"Cannot retrieve access token for user: {self.user} "
                f"during the Google My Business request preparation."
            )
            return ""
        return access_token

    def retrieve_request_account_name(self) -> str:
        """
        Method that retrieves user's account name before request to
        Google Business API.
        """

        service_account_name = GoogleMyBusinessAccount.get_account_service_name(self.user)
        if not service_account_name:
            LOGGER.error(
                f"Cannot retrieve Google service account name for user: {self.user} "
                f"during the Google My Business request preparation."
            )
            return ""
        return service_account_name


def api_call(api_call_method):
    """
    Decorator that wraps each method that makes calls to the Google API and updates
    the access token when token is expired.
    """

    def prepared_api_call(
        api_service: "GoogleMyBusinessAPIService", user: CustomUser, *args, **kwargs
    ):
        """Wrapper for API method."""

        if api_service.oauth_provider.is_access_token_expired(user):
            refresh_token = api_service.oauth_provider.get_refresh_token(user)
            api_service.oauth_provider.refresh_token(user, refresh_token)

        request_handler = RequestHandler(api_service, user)
        return api_call_method(api_service, request_handler, *args, **kwargs)

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
    def create_post(self, request_handler: RequestHandler, post_data: LOCATION_POST):
        """
        Method that send creation POST request to the Google My Business
        localPost/ API endpoint.
        :param request_handler: General request data.
        :param post_data: dict that represents the payload to send to
        the Google service API.
        :return: dict with created post data or None.
        """

        posts_endpoint = f"{self.LIBRARY_LOCATION_PATH}{self.POSTS_PATH}"
        response = requests.post(
            url=f"{self.GOOGLE_MY_BUSINESS_PATH}{request_handler.account_name}/{posts_endpoint}",
            json=post_data,
            headers=request_handler.headers,
        )
        if not response:
            LOGGER.error(
                f"Failed to create Google My Business post. "
                f"User: {request_handler.user} Data: {post_data} "
                f"Failed API response: {response.text}"
            )
            return None

        return response.json()

    @api_call
    def delete_post(self, request_handler: RequestHandler, post_name: str):
        """
        Method that send deletion DELETE request to the Google My Business
        localPost/ API endpoint.
        :param request_handler: General request data.
        :param post_name: string that represents the post name at Google Business API.
        :return: dict with created post data or None.
        """

        response = requests.delete(
            url=f"{self.GOOGLE_MY_BUSINESS_PATH}{post_name}", headers=request_handler.headers,
        )
        if not response:
            LOGGER.error(
                f"Failed to remove Google My Business post. "
                f"User: {request_handler.user} Data: {post_name} "
                f"Failed API response: {response.text}"
            )
            return False

        return True

    @api_call
    def get_account(self, request_handler: RequestHandler):
        """
        Method that retrieves the Google My Business account for the current session user.
        :param request_handler: General request data.
        :return: dict with data that represents Google My Business service account.
        """

        response = requests.get(
            url=f"{self.GOOGLE_MY_BUSINESS_PATH}{self.ACCOUNTS_PATH}",
            headers=request_handler.headers,
        )
        if not response:
            LOGGER.error(
                f"Failed to retrieve Google My Business account. "
                f"User: {request_handler.user} Failed API response: {response.text}"
            )
            return None

        try:
            return response.json().get("accounts", []).pop()
        except IndexError as err:
            LOGGER.error(
                f"There is no any Google My Business account for User: {request_handler.user} "
                f"Error: {err}"
            )
            return None


GOOGLE_MY_BUSINESS_API_SERVICE = GoogleMyBusinessAPIService()
