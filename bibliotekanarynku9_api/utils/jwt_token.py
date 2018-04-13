"""
The module that provides logic for creating and handling JWT tokens.
"""

from django.conf import settings
from django.utils import timezone
import jwt


SECRET_KEY = settings.JWT_TOKEN_KEY
ALGORITHM = settings.JWT_ALGORITHM


def create_token(data, expiration_time=None, not_before_time=None):
    """
    Function that creates JWT token with received date and
    certain expiration time.
    """

    try:
        if expiration_time:
            exp = int(timezone.now().timestamp()) + expiration_time
            data['exp'] = exp

        if not_before_time:
            nbf = int(timezone.now().timestamp()) + not_before_time
            data['nbf'] = nbf

        token = jwt.encode(data, SECRET_KEY, ALGORITHM)
        return token

    except TypeError:
        pass


def handle_token(jwt_token):
    """Function that handle the received JWT token."""

    try:
        return jwt.decode(jwt_token, SECRET_KEY, ALGORITHM)
    except (jwt.ExpiredSignatureError, jwt.DecodeError):
        pass
