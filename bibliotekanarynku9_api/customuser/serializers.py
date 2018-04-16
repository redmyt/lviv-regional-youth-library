"""
Module that describes the serializer for the User model.
"""

from rest_framework import serializers
from customuser.models import CustomUser


class UserSerializer(serializers.ModelSerializer):
    """UserSerializer model serializer"""

    class Meta:
        model = CustomUser
        fields = ('first_name', 'last_name', 'email')
