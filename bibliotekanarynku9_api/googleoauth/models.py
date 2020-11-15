"""
Module that describes the models for store Google OAuth session records.
Each user of the library site could use Google services.
This data model store the user's or service's tokens with relation to
the certain Google's services.
Each user or service should use only its own tokens and does not have multiple
tokens associated with one Google service.
"""

from django.db import models

from googleoauth.exceptions import GoogleOAuthSessionDoesNotExist
from googleoauth.utils import GoogleServices
from utils.abstract_model import AbstractModel
from utils.logger import LOGGER


SERVICE_CHOICES = ((GoogleServices.MY_BUSINESS.value, GoogleServices.MY_BUSINESS.name),)


class GoogleOAuthSession(AbstractModel):
    """
    Model that represents the Google OAuth session.
    Each user's or service's tokens should be associated with one Google service.
    """

    email = models.EmailField(max_length=128)
    service = models.IntegerField(choices=SERVICE_CHOICES)
    access_token = models.CharField(max_length=200)
    refresh_token = models.CharField(max_length=110)
    expires_at = models.DateTimeField()

    class Meta:
        """Meta settings for GoogleOAuthSession."""

        unique_together = (("email", "service"),)

    @classmethod
    def get_service_session_by_email(cls, service: int, email: str):
        """
        Method that retrieves the GoogleOAuthSession record according
        to the certain service and user's or service's email associated with it.
        :param service: represents the one of the Google Services.
        :param email: represents the user or the service email from settings.
        :return: GoogleOAuthSession record.
        """
        try:
            return cls.objects.get(service=service, email=email)
        except cls.DoesNotExist as err:
            LOGGER.error(
                f"OAuth session for service: {service} and email: {email} doesn't exist. "
                f"Exception: {err}"
            )
            raise GoogleOAuthSessionDoesNotExist(GoogleServices(service).name, email)

    @classmethod
    def get_service_access_token_by_email(cls, service: int, email: str):
        """
        Method that returns last saved access token
        for the accepted service and user's or service's email associated with it.
        :param service: represents the one of the Google Services.
        :param email: represents the user or the service email from settings.
        :return: last saved access token associated with service and email.
        """
        try:
            oauth_session = cls.get_service_session_by_email(service=service, email=email)
            return oauth_session.access_token
        except GoogleOAuthSessionDoesNotExist:
            LOGGER.error(
                f"Cannot retrieve the access token for service: {service} and email: {email}. "
                f"There is no {cls.__name__} instance."
            )
            raise

    @classmethod
    def get_service_refresh_token_by_email(cls, service: int, email: str):
        """
        Method that returns refresh token for the accepted service
        and user's or service's email associated with it.
        :param service: represents the one of the Google Services.
        :param email: represents the user or the service email from settings.
        :return: refresh token which is associated with service and email.
        """
        try:
            oauth_session = cls.get_service_session_by_email(service=service, email=email)
            return oauth_session.refresh_token
        except GoogleOAuthSessionDoesNotExist:
            LOGGER.error(
                f"Cannot retrieve the refresh token for service: {service} and email: {email}. "
                f"There is no {cls.__name__} instance."
            )
            raise

    @classmethod
    def get_access_token_expire_time(cls, service: int, email: str):
        """
        Method that returns the time when access token will become invalid.
        :param service: represents the one of the Google Services.
        :param email: represents the user or the service email from settings.
        :return: time when the access token become expired.
        """
        try:
            oauth_session = cls.get_service_session_by_email(service=service, email=email)
            return oauth_session.expires_at
        except GoogleOAuthSessionDoesNotExist:
            LOGGER.error(
                f"Cannot retrieve the expire time for service: {service} and email: {email}. "
                f"There is no {cls.__name__} instance."
            )
            raise

    @classmethod
    def update_service_access_token_by_email(
        cls, service, email, refreshed_access_token, expires_at
    ):
        """
        Method that refreshes access token for the certain email and service in the session record.
        :param service: represents the one of the Google Services.
        :param email: represents the user or the service email from settings.
        :param refreshed_access_token: updated access token associated with service and email.
        :return: session record with updated access token.
        """
        try:
            oauth_session = cls.get_service_session_by_email(service=service, email=email)
            return oauth_session.update(
                {"access_token": refreshed_access_token, "expires_at": expires_at}
            )
        except GoogleOAuthSessionDoesNotExist:
            LOGGER.error(
                f"Cannot update access token at instance of: {cls.__name__} "
                f"for service: {service} and email: {email}. Cannot retrieve session record."
            )
            raise
