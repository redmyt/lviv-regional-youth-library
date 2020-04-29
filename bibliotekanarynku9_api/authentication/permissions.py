"""
Module that contains the general permissions classes for flexible managing the
user access to application endpoints.
"""

from rest_framework.permissions import BasePermission
from admin.management.commands.createadmins import ADMINS_GROUP_NAME


class IsAdminsMember(BasePermission):
    """
    Allows access only to users that are members of admins group.
    """

    def has_permission(self, request, view):
        return bool(request.user and request.user.groups.filter(name=ADMINS_GROUP_NAME).exists())
