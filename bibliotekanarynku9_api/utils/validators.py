"""Module that contains all kind of project validators."""

from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError


def password_validator(password):
    """Function that validates the user password according to the settings."""

    try:
        validate_password(password)
        return True
    except ValidationError:
        return False
