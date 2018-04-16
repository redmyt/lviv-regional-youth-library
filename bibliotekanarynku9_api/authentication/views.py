"""Module that describe authentication views."""

from rest_framework import viewsets
from rest_framework.decorators import action
from customuser.serializers import  CustomUserSerializer
from utils.jwt_token import create_token
from utils.responses import (RESPONSE_400_EMPTY_REQUEST,
                             RESPONSE_400_INVALID_DATA,
                             RESPONSE_400_FAILED_CREATION,
                             RESPONSE_201_REGISTERED)
from utils.send_email import send_email


TTL_ACTIVATION_TOKEN = 60 * 60
REGISTRATION_TEMPLATE = 'registration.html'


class AuthenticationViewSet(viewsets.ViewSet):
    """Describes all authentication views"""

    @staticmethod
    @action(methods=['post'], detail=False)
    def registration(request):
        """User registration handler"""

        raw_data = request.data
        if not raw_data:
            return RESPONSE_400_EMPTY_REQUEST

        serializer = CustomUserSerializer(data=raw_data)
        if not serializer.is_valid():
            return RESPONSE_400_INVALID_DATA

        user = serializer.save()
        if not user:
            return RESPONSE_400_FAILED_CREATION

        activation_token = create_token(
            data={'email': user.email},
            expiration_time=TTL_ACTIVATION_TOKEN)
        ctx = {'token': activation_token}
        send_email([user.email], REGISTRATION_TEMPLATE, ctx)
        return RESPONSE_201_REGISTERED
