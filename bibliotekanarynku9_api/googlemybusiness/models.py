"""
Module that describes the modes for store Google My Business accounts data.
Each user or library service of the app can have only one Google My Business account.
This data model store the library user's or service's email with relation to
Google My Business account's data.
"""

from django.db import models

from googlemybusiness.exceptions import GoogleMyBusinessAccountDoesNotExist
from utils.abstract_model import AbstractModel
from utils.logger import LOGGER


class GoogleMyBusinessAccount(AbstractModel):
    """
    Model that represents the Google My Business account data.
    """

    email = models.EmailField(max_length=128, unique=True)
    service_name = models.CharField(max_length=80)
    account_name = models.CharField(max_length=80)

    @classmethod
    def get_account_service_name(cls, email: str):
        """
        Method that retrieves the Google My Business account's service name
        for the certain user's or service's email.
        :param email: represent current user's or service's email
        associated with Google My Business service.
        :return: name that represents the Google My Business account's service name.
        """
        try:
            google_my_business_account = cls.objects.get(email=email)
            return google_my_business_account.service_name
        except cls.DoesNotExist as err:
            LOGGER.error(
                f"Cannot retrieve the service name for Google My Business account. "
                f"Email: {email}. Exception: {err}"
            )
            raise GoogleMyBusinessAccountDoesNotExist
