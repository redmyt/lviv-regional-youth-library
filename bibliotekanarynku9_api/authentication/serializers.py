"""
Module that describes the serializer for the User model
"""

from rest_framework import serializers
from authentication.models import User


class UserSerializer(serializers.ModelSerializer):
    """UserSerializer model serializer"""

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email')
