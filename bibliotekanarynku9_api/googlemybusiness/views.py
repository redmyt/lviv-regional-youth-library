"""
Module that represents views for the Google My Business app.
"""

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from authentication.permissions import IsAdminsMember
from googlemybusiness.googlemybusiness import GOOGLE_MY_BUSINESS_API_SERVICE
from utils.responses import (
    RESPONSE_400_NO_OAUTH_CODE_PROVIDED,
    RESPONSE_201_GENERATED_ACCESS_TOKEN,
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
            {"authorization_url": GOOGLE_MY_BUSINESS_API_SERVICE.get_authorize_url()}, status=200,
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

        GOOGLE_MY_BUSINESS_API_SERVICE.connect(auth_code)
        return RESPONSE_201_GENERATED_ACCESS_TOKEN
