"""
Module that represents views for the Google My Business app.
"""

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from googlemybusiness.googlemybusiness import GOOGLE_MY_BUSINESS_PROVIDER
from utils.responses import (
    RESPONSE_400_NO_OAUTH_CODE_PROVIDED,
    RESPONSE_400_ACCESS_TOKEN_GENERATION_FAILURE,
    RESPONSE_200_ACCESS_TOKEN_EXISTS,
    RESPONSE_404_ACCESS_TOKEN_NOT_FOUND,
    RESPONSE_201_GENERATED_ACCESS_TOKEN,
)


class GoogleMyBusinessViewSet(viewsets.ViewSet):
    """
    Class that contains basic controllers for the handle
    interaction with Google My Business service.
    """

    @staticmethod
    @action(methods=["get"], detail=False, permission_classes=[IsAuthenticated])
    def authorize(_):
        """View that starts the Auth Code flow."""

        return Response(
            {"authorization_url": GOOGLE_MY_BUSINESS_PROVIDER.get_authorize_url()}, status=200,
        )

    @staticmethod
    @action(methods=["get"], detail=False, permission_classes=[IsAuthenticated])
    def authorize_callback(request):
        """
        View that handle Auth Code callback request and finishes flow by
        generating access token.
        """

        auth_code = request.query_params.get("code")
        if not auth_code:
            return RESPONSE_400_NO_OAUTH_CODE_PROVIDED

        generated = GOOGLE_MY_BUSINESS_PROVIDER.generate_oauth_tokens(
            request.user, request.query_params["code"]
        )
        if not generated:
            return RESPONSE_400_ACCESS_TOKEN_GENERATION_FAILURE

        return RESPONSE_201_GENERATED_ACCESS_TOKEN

    @staticmethod
    @action(methods=["get"], detail=False, permission_classes=[IsAuthenticated])
    def token_status(request):
        """
        Method that verifies does user need to generate the access token or it is
        already generated.
        """

        if GOOGLE_MY_BUSINESS_PROVIDER.get_access_token(request.user):
            return RESPONSE_200_ACCESS_TOKEN_EXISTS
        return RESPONSE_404_ACCESS_TOKEN_NOT_FOUND
