"""Module that provides various HttResponse objects for project."""

from rest_framework.response import Response
from rest_framework import status


# status code 2xx

RESPONSE_201_REGISTERED = Response(
    'User successfully registered. Email confirmation required.',
    status=status.HTTP_201_CREATED
)

RESPONSE_200_ACTIVATED = Response(
    'Email successfully confirm.',
    status=status.HTTP_200_OK
)

RESPONSE_200_LOGGED = Response(
    'User successfully signed in',
    status=status.HTTP_200_OK
)

# status code 4xx

RESPONSE_400_EMPTY_REQUEST = Response(
    'Empty JSON received',
    status=status.HTTP_400_BAD_REQUEST)

RESPONSE_400_INVALID_DATA = Response(
    'Invalid data received',
    status=status.HTTP_400_BAD_REQUEST)

RESPONSE_400_FAILED_CREATION = Response(
    'Failed object creation',
    status=status.HTTP_400_BAD_REQUEST)

RESPONSE_400_INVALID_TOKEN = Response(
    'Empty or invalid token received',
    status=status.HTTP_400_BAD_REQUEST
)

RESPONSE_400_INVALID_EMAIL = Response(
    'Invalid email received',
    status=status.HTTP_404_NOT_FOUND
)

RESPONSE_400_INVALID_EMAIL_OR_PASSWORD = Response(
    'Invalid email or password received',
    status=status.HTTP_400_BAD_REQUEST
)
