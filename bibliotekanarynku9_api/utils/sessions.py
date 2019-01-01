"""
Module that contains the variety of host solving,
user sessions and networks utilities.
"""

def get_client_ip(request):
    """Function for getting the initial client IP."""

    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        client_ip = x_forwarded_for.split(',')[0]
    else:
        client_ip = request.META.get('REMOTE_ADDR')
    return client_ip
