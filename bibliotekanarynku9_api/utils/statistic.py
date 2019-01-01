"""Module for the main statistics manager functionality."""

import datetime
from utils.sessions import get_client_ip
from utils.handlers import REDIS_HANDLER


class StatisticManager:
    """Main statistics manager for checking the popularity of the site."""

    instance = None

    def __new__(cls):
        if cls.instance is None:
            cls.instance = super(StatisticManager, cls).__new__(cls)
        return cls.instance

    def __init__(self):
        self.daily_ips_set_name = self.get_daily_ips_set_name()

    def get_daily_ips_set(self):
        """Return all IPs in the Redis DB for today."""

        return REDIS_HANDLER.get_set(self.daily_ips_set_name)

    def remove_daily_ips_set(self):
        """Remove daily set with IPs."""

        return REDIS_HANDLER.remove_value(self.daily_ips_set_name)

    def update_daily_ips_set_name(self):
        """Refresh the set name property of statistic manager innstance."""

        self.daily_ips_set_name = self.get_daily_ips_set_name()

    @staticmethod
    def get_daily_ips_set_name():
        """Generate the actual name for the daily IPs set."""

        return str(datetime.date.today())

    def process_request(self, request):
        """Handle the request and save the user IP to Redis."""

        client_ip = get_client_ip(request)
        REDIS_HANDLER.set_value(self.daily_ips_set_name, {client_ip})


STATISTIC_MANAGER = StatisticManager()
