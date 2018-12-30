# pylint: disable-all

import datetime
from utils.sessions import get_client_ip
from utils.handlers import REDIS_HANDLER

class StatisticManager:

    def __init__(self):
        self.daily_ips_set_name = 'ipsSet'

    # def create_daily_ips_set(self)

    # def get_daily_ips_set(self)

    # def get_daily_ips_set_name(self):

    def process_request(self, request):
        ip = get_client_ip(request)
        REDIS_HANDLER.set_value(self.daily_ips_set_name, {ip,})


STATISTIC_MANAGER = StatisticManager()
