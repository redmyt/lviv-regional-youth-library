"""
Module for maintenance multi language support.
"""

from enum import Enum


class Languages(Enum):
    """
    Enum that represents all languages that could be used at library site.
    """

    UK = 1
    EN = 2


LANGUAGE_CHOICES = (
    (Languages.UK.value, Languages.UK.name),
    (Languages.EN.value, Languages.EN.name),
)


LANGUAGE_HEADER = "HTTP_ACCEPT_LANGUAGE"
DEFAULT_LANGUAGE_CODE = 0


def get_request_language(request):
    """Retrieve the language from request header."""

    language_map = {choice[1]: choice[0] for choice in LANGUAGE_CHOICES}
    accept_language = request.META.get(LANGUAGE_HEADER)
    language_code = language_map.get(accept_language, DEFAULT_LANGUAGE_CODE)
    return language_code


def filter_serialized_translations(ser_data, request):
    """
    Function for filtering the output of translation entities for the
    certain serialized instance according to the Accept-Language header
    from request.
    """

    if request:
        lang_code = get_request_language(request)

        if lang_code:
            translations = [
                transl for transl in ser_data["translations"] if transl["language"] == lang_code
            ]
            ser_data.update({"translations": translations})

    return ser_data
