"""
Module for maintenance multi language support.
"""

LANGUAGE_CHOICES = (
    (1, 'uk'),
    (2, 'en')
)


LANGUAGE_HEADER = 'HTTP_ACCEPT_LANGUAGE'
DEFAULT_LANGUAGE_CODE = 0


def get_request_language(request):
    """Retrieve the language from request header."""

    language_map = {choice[1]: choice[0] for choice in LANGUAGE_CHOICES}
    accept_language = request.META.get(LANGUAGE_HEADER)
    language_code = language_map.get(accept_language, DEFAULT_LANGUAGE_CODE)
    return language_code
