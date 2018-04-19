"""
Module that describes the serializer for the CustomUser model.
"""

from rest_framework import serializers
from customuser.models import CustomUser
from utils.validators import password_validator


class CustomUserSerializer(serializers.ModelSerializer):
    """CustomUserSerializer model serializer"""

    class Meta:
        model = CustomUser
        fields = ('first_name', 'last_name', 'email', 'password', 'is_active')
        write_only_fields = ('password',)
        read_only_fields = ('is_active',)

    def create(self, validated_data):
        user = CustomUser(**validated_data)
        user.email = validated_data['email'].lower().strip()
        user.set_password(validated_data['password'])
        user.save()
        return user

    @staticmethod
    def validate_password(value):
        """Validate value for the password field"""

        is_valid = password_validator(value)
        if not is_valid:
            raise serializers.ValidationError('Invalid password')
        return value
