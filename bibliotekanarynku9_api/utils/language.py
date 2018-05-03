"""
Module for maintenance multi language support.
"""

LANGUAGE_CHOICES = (
    (0, 'uk'),
    (1, 'en')
)

DEF_LANG = 0

def get_request_language(request):
    lang_map = {lang_pair[1]: lang_pair[0] for lang_pair in LANGUAGE_CHOICES}
    # print(lang_map)
    accept_language = request.META.get('HTTP_ACCEPT_LANGUAGE')
    # print(type(LANGUAGE_CHOICES))
    code =  lang_map.get(accept_language, DEF_LANG)
    return code
