"""
Module that describes the CustomUser entity which using for describing all
persons that are using the library website.
"""

from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser


class CustomUser(AbstractBaseUser):
    """CustomUser entity description"""

    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(max_length=128, unique=True)
    password = models.CharField(max_length=128)
    is_active = models.BooleanField(default=False)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)

    USERNAME_FIELD = 'email'

    def get_full_name(self):
        """Method for getting full CustomUser name"""

        return f'{self.first_name} {self.last_name}'

    def get_short_name(self):
        """Method for getting short CustomUser name"""

        return self.get_full_name()
