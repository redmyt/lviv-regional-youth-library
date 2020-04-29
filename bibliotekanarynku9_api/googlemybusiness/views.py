"""
Module that represents views for the Google My Business app.
"""

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from authentication.permissions import IsAdminsMember
from googlemybusiness.models import GoogleMyBusinessAccount
from googlemybusiness.provider import GOOGLE_MY_BUSINESS_OAUTH_PROVIDER
from googlemybusiness.service import GOOGLE_MY_BUSINESS_API_SERVICE
from googleoauth.models import GoogleOAuthSession
from googleoauth.utils import GoogleServices
from utils.responses import (
    RESPONSE_400_NO_OAUTH_CODE_PROVIDED,
    RESPONSE_400_ACCESS_TOKEN_GENERATION_FAILURE,
    RESPONSE_200_ACCESS_TOKEN_EXISTS,
    RESPONSE_404_ACCESS_TOKEN_NOT_FOUND,
    RESPONSE_201_GENERATED_ACCESS_TOKEN,
    RESPONSE_404_GOOGLE_BUSINESS_ACCOUNT_NOT_FOUND,
    RESPONSE_400_GOOGLE_BUSINESS_ACCOUNT_SAVING_FAILURE,
    RESPONSE_400_REFRESH_TOKEN_FAILURE,
    RESPONSE_200_ACCESS_TOKEN_REFRESHED,
)


class GoogleMyBusinessViewSet(viewsets.ViewSet):
    """
    Class that contains basic controllers for the handle
    interaction with Google My Business service.
    """

    @staticmethod
    @action(methods=["get"], detail=False, permission_classes=[IsAdminsMember])
    def authorize(_):
        """View that starts the Auth Code flow."""

        return Response(
            {"authorization_url": GOOGLE_MY_BUSINESS_OAUTH_PROVIDER.get_authorize_url()},
            status=200,
        )

    @staticmethod
    @action(methods=["get"], detail=False, permission_classes=[IsAdminsMember])
    def authorize_callback(request):
        """
        View that handle Auth Code callback request and finishes flow by
        generating access token.
        """

        auth_code = request.query_params.get("code")
        if not auth_code:
            return RESPONSE_400_NO_OAUTH_CODE_PROVIDED

        generated = GOOGLE_MY_BUSINESS_OAUTH_PROVIDER.generate_oauth_tokens(
            request.user, request.query_params["code"]
        )
        if not generated:
            return RESPONSE_400_ACCESS_TOKEN_GENERATION_FAILURE

        google_service_account = GOOGLE_MY_BUSINESS_API_SERVICE.get_account(request.user)
        if not google_service_account:
            return RESPONSE_404_GOOGLE_BUSINESS_ACCOUNT_NOT_FOUND

        saved_service_account = GoogleMyBusinessAccount.create(
            {
                "user": request.user,
                "service_name": google_service_account["name"],
                "account_name": google_service_account["accountName"],
            }
        )
        if not saved_service_account:
            return RESPONSE_400_GOOGLE_BUSINESS_ACCOUNT_SAVING_FAILURE

        return RESPONSE_201_GENERATED_ACCESS_TOKEN

    @staticmethod
    @action(methods=["get"], detail=False, permission_classes=[IsAdminsMember])
    def token_status(request):
        """
        Method that verifies does user need to generate the access token or it is
        already generated.
        """

        if GOOGLE_MY_BUSINESS_OAUTH_PROVIDER.get_access_token(request.user):
            return RESPONSE_200_ACCESS_TOKEN_EXISTS
        return RESPONSE_404_ACCESS_TOKEN_NOT_FOUND

    # TODO: Temporary endpoint for manual token refresh
    @staticmethod
    @action(methods=["get"], detail=False, permission_classes=[IsAdminsMember])
    def refresh_token(request):
        """
        Method that refreshes token for the current session user.
        """

        session = GoogleOAuthSession.get_service_session_by_user(
            GoogleServices.MY_BUSINESS.value, request.user
        )
        if not session:
            return RESPONSE_404_ACCESS_TOKEN_NOT_FOUND
        is_refreshed = GOOGLE_MY_BUSINESS_OAUTH_PROVIDER.refresh_token(
            request.user, session.refresh_token
        )
        if not is_refreshed:
            return RESPONSE_400_REFRESH_TOKEN_FAILURE
        return RESPONSE_200_ACCESS_TOKEN_REFRESHED
