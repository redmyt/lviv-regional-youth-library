"""Module that describe admin views."""

from django.conf import settings
from django.contrib.auth.models import Group
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from customuser.models import CustomUser
from customuser.serializers import CustomUserSerializer
from utils.data_access import get_object_or_none
from utils.jwt_token import create_token, handle_token
from utils.responses import (RESPONSE_200_ADMINS_JOINED,
                             RESPONSE_200_ADMINS_REQUESTED,
                             RESPONSE_200_ADMINS_PERMISSIONS_CONFIRMED,
                             RESPONSE_400_INVALID_TOKEN,
                             RESPONSE_400_UNEXPECTED_PARAMETERS,
                             RESPONSE_403_USER_ALREADY_ADMIN,
                             RESPONSE_403_ADMINS_PERMISSIONS_UNCONFIRMED,
                             RESPONSE_404_ADMINS_GROUP_INACCESSIBLE)
from utils.send_email import send_email
from .manage_apps import ADMIN_MANAGEMENT_APPS


ADMIN_REQUEST_TEMPLATE = 'admin-request.html'
ADMIN_CONFIRM_TEMPLATE = 'admin-confirm.html'
ADMIN_VERIFICATION_KEYS = ('first_name', 'last_name', 'email')
REQUIRED_ADMINS_KEYS = ('email', 'password')
SUPERUSER_EMAIL = settings.SUPERUSER_EMAIL


class AdminViewSet(viewsets.ViewSet):
    """Describes all admin views."""

    @staticmethod
    @action(methods=['get'],
            detail=False,
            permission_classes=[IsAuthenticated])
    def request(request):
        """User request to join Admins group."""

        serializer = CustomUserSerializer(request.user)
        data = {
            key: serializer.data.get(key) for key in ADMIN_VERIFICATION_KEYS
        }
        activation_token = create_token(data)
        ctx = {'token': activation_token, **data}
        send_email([SUPERUSER_EMAIL], ADMIN_REQUEST_TEMPLATE, ctx)
        return RESPONSE_200_ADMINS_REQUESTED

    @staticmethod
    @action(methods=['get'], detail=False, url_path='confirm/(?P<token>.+)')
    def confirm(request, token):
        """Confirm User to be joined the Admins group."""

        data = handle_token(token)
        if not data:
            return RESPONSE_400_INVALID_TOKEN

        if request.query_params:
            return RESPONSE_400_UNEXPECTED_PARAMETERS

        user = CustomUser.get_by_email(email=data.get('email'))
        admins_group = get_object_or_none(Group, query_args={'name': 'admins'})
        if not admins_group:
            return RESPONSE_404_ADMINS_GROUP_INACCESSIBLE

        is_user_admin = bool(admins_group.user_set.filter(pk=user.id))
        if is_user_admin:
            return RESPONSE_403_USER_ALREADY_ADMIN

        admins_group.user_set.add(user)
        ctx = {'first_name': user.first_name}
        send_email((user.email,), ADMIN_CONFIRM_TEMPLATE, ctx)
        return RESPONSE_200_ADMINS_JOINED

    @staticmethod
    @action(methods=['get'],
            detail=False,
            permission_classes=[IsAuthenticated])
    def manage_apps(request):
        """Get list of the apps that site admins can manage."""

        if request.query_params:
            return RESPONSE_400_UNEXPECTED_PARAMETERS

        return Response(ADMIN_MANAGEMENT_APPS, status=200)

    @staticmethod
    @action(methods=['get'],
            detail=False,
            permission_classes=[IsAuthenticated])
    def permissions(request):
        """Check does the requested user has administration permissions."""

        admins_group = Group.objects.get(name='admins')
        try:
            admins_group.user_set.get(email=request.user.email)
            return RESPONSE_200_ADMINS_PERMISSIONS_CONFIRMED
        except CustomUser.DoesNotExist:
            return RESPONSE_403_ADMINS_PERMISSIONS_UNCONFIRMED
