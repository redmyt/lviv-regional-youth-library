"""
Statistic middleware that provides grubbing of the each user request and
forward it to the Statistic manager.
"""

import threading
from utils.statistic import STATISTIC_MANAGER


class StatisticMiddleware: # pylint: disable=too-few-public-methods
    """
    The class that represents the middleware for checking user statistics.
    """

    def __init__(self, get_response):
        """Constructor method that creates middleware instance."""

        self.get_response = get_response

    def __call__(self, request):
        """
        Method that forwards the request to the Statistic manager class.
        """

        request_process_thread = threading.Thread(
            target=STATISTIC_MANAGER.process_request, args=(request,)
        )
        request_process_thread.start()
        response = self.get_response(request)
        return response
