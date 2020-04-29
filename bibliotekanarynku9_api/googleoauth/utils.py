"""
Module that contains common general functions and data structures
for the googleoauth app.
"""

from enum import Enum


class GoogleServices(Enum):
    """
    Enum that represents all existing Google services that can be used by app.
    """

    MY_BUSINESS = 1
