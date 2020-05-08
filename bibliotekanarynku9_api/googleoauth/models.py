"""
Module that describes the modes for store Google OAuth session record.
Each user of the library site could use Google services.
This data model store the user's tokens with relation to the certain Google's services.
Each user should use only its own tokens and does not have multiple
tokens associated with one Google service.
"""

from django.db import models

from customuser.models import CustomUser
from googleoauth.utils import GoogleServices
from utils.abstract_model import AbstractModel
from utils.logger import LOGGER


SERVICE_CHOICES = ((GoogleServices.MY_BUSINESS.value, GoogleServices.MY_BUSINESS.name),)


class GoogleOAuthSession(AbstractModel):
    """
    Model that represents the Google OAuth session.
    Each user's tokens should be associated with one Google service.
    """

    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="googleoauthsession"
    )
    service = models.IntegerField(choices=SERVICE_CHOICES)
    access_token = models.CharField(max_length=171)
    refresh_token = models.CharField(max_length=103)
    expires_at = models.DateTimeField()

    class Meta:
        """Meta settings for GoogleOAuthSession."""

        unique_together = (("user", "service"),)

    @classmethod
    def get_service_session_by_user(cls, service, user):
        """
        Method that retrieves the GoogleOAuthSession record according
        to the certain service and user.
        :param service: int that represents the one of the Google Services.
        :param user: CustomUser instance that represent current session user.
        :return: Instance of GoogleOAuthSession record or None.
        """
        try:
            return cls.objects.get(service=service, user=user)
        except cls.DoesNotExist as err:
            LOGGER.error(
                f"OAuth session for service: {service} and user: {user} doesn't exist. "
                f"Exception: {err}"
            )

    @classmethod
    def get_service_access_token_by_user(cls, service, user):
        """
        Method that returns last saved access token
        for the accepted service and user.
        :param service: int that represents the one of the Google Services.
        :param user: CustomUser instance that represent current session user.
        :return: str that represents last saved access token or None.
        """
        oauth_session = cls.get_service_session_by_user(service=service, user=user)
        if oauth_session:
            return oauth_session.access_token
        LOGGER.error(
            f"Cannot retrieve the access token for service: {service} and user: {user}. "
            f"There is no {cls.__name__} instance."
        )
        return ""

    @classmethod
    def get_access_token_expire_time(cls, service, user):
        """
        Method that returns the time when access token will become invalid.
        """
        oauth_session = cls.get_service_session_by_user(service=service, user=user)
        if oauth_session:
            return oauth_session.expires_at
        LOGGER.error(
            f"Cannot retrieve the expire time for service: {service} and user: {user}. "
            f"There is no {cls.__name__} instance."
        )
        return None

    @classmethod
    def update_service_access_token_by_user(cls, service, user, refreshed_access_token, expires_at):
        """
        Method that refreshes access token for the certain user and service.
        :param service: int that represents the one of the Google Services.
        :param user: CustomUser instance that represent current session user.
        :param refreshed_access_token: str that represents the user's refresh token.
        :return: Instance of GoogleOAuthSession record with updated access token or None.
        """
        oauth_session = cls.get_service_session_by_user(service=service, user=user)
        if oauth_session:
            return oauth_session.update(
                {"access_token": refreshed_access_token, "expires_at": expires_at}
            )
        LOGGER.error(
            f"Cannot update {cls.__name__} for service: {service} and user: {user}. "
            f"Cannot retrieve session record."
        )
        return False
