"""Module that describes the Announcement app tasks."""

from __future__ import absolute_import
import datetime
from celery.task.schedules import crontab
from celery.decorators import periodic_task
from celery.utils.log import get_task_logger
from utils.logger import LOGGER
from announcement.models import Announcement


CURRENT_DATE = datetime.datetime.today()


@periodic_task(
    run_every=(crontab(hour='0', minute='0')),
    name='remove_outdated_announcements',
    ignore_result=True
)
def remove_outdate_announcements():
    """Task that gets the old announcements and deletes they from db."""

    result = {'removed': False}
    outdated_announs = Announcement.get_filtered(start_at__lt=CURRENT_DATE)

    if outdated_announs:
        outdated_announs.delete()
        result['removed'] = True
        LOGGER.info(f'Remove outdated announcements for {CURRENT_DATE} date.')

    return result
