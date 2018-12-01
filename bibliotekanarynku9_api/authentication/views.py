"""Module that describe authentication views."""

from django.contrib.auth import authenticate, login, logout
from django.template.loader import render_to_string
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.renderers import JSONRenderer, StaticHTMLRenderer
from rest_framework.response import Response
from customuser.models import CustomUser
from customuser.serializers import CustomUserSerializer
from utils.jwt_token import create_token, handle_token
from utils.responses import (RESPONSE_200_LOGGED,
                             RESPONSE_200_LOGOUTED,
                             RESPONSE_201_REGISTERED,
                             RESPONSE_400_EMPTY_REQUEST,
                             RESPONSE_400_INVALID_DATA,
                             RESPONSE_400_FAILED_CREATION,
                             RESPONSE_400_INVALID_EMAIL_OR_PASSWORD)
from utils.send_email import send_email
from utils.handlers import USER_SESSION_HANDLER
from utils.validators import required_keys_validator


TTL_ACTIVATION_TOKEN = 60 * 60
REGISTRATION_TEMPLATE = 'registration.html'
ACTIVATION_INVALID_PARAMS_TEMPLATE = 'activation/invalid-params.html'
ACTIVATION_INVALID_TOKEN_TEMPLATE = 'activation/invalid-token.html'
ACTIVATION_INVALID_EMAIL_TEMPLATE = 'activation/invalid-email.html'
ACTIVATION_SUCCESS_TEMPLATE = 'activation/activated.html'
REQUIRED_LOGIN_KEYS = ('email', 'password')
USER_SESSION_COOKIE = 'user_id'


class AuthenticationViewSet(viewsets.ViewSet):
    """Describes all authentication views."""

    renderer_classes = (JSONRenderer, StaticHTMLRenderer)

    @staticmethod
    @action(methods=['post'], detail=False)
    def register(request):
        """User registration handler."""

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
        ctx = {
            'email': user.email,
            'token': activation_token,
            'time_left': TTL_ACTIVATION_TOKEN // 60
        }
        send_email([user.email], REGISTRATION_TEMPLATE, ctx)
        return RESPONSE_201_REGISTERED

    @staticmethod
    @action(detail=False, url_path='activate/(?P<token>.+)')
    def activate(request, token):
        """User activation handles."""

        if request.query_params:
            return Response(
                render_to_string(ACTIVATION_INVALID_PARAMS_TEMPLATE))

        data = handle_token(token)
        if not data:
            return Response(
                render_to_string(ACTIVATION_INVALID_TOKEN_TEMPLATE))

        user = CustomUser.get_by_email(email=data.get('email'))
        if not user:
            return Response(
                render_to_string(ACTIVATION_INVALID_EMAIL_TEMPLATE))

        user.is_active = True
        user.save()
        return Response(render_to_string(ACTIVATION_SUCCESS_TEMPLATE))

    @staticmethod
    @action(methods=['post'], detail=False)
    def login(request):
        """Login user handler."""

        data = request.data
        if not required_keys_validator(data, REQUIRED_LOGIN_KEYS):
            return RESPONSE_400_INVALID_DATA

        email = data['email'].strip().lower()
        password = data['password']
        user = authenticate(email=email, password=password)
        if not user or not user.is_active:
            return RESPONSE_400_INVALID_EMAIL_OR_PASSWORD

        login(request, user)
        hash_user_id = USER_SESSION_HANDLER.hash_user_id(user.id)
        RESPONSE_200_LOGGED.set_cookie(USER_SESSION_COOKIE, hash_user_id)
        return RESPONSE_200_LOGGED

    @staticmethod
    @action(methods=['get'], detail=False)
    def logout(request):
        """Logout user handler."""

        logout(request)
        RESPONSE_200_LOGOUTED.delete_cookie(USER_SESSION_COOKIE)
        return RESPONSE_200_LOGOUTED
