# pylint: disable=C0413
# (Imports not at the top of module)

"""Script for deleting the outdated announcements from the database."""

import datetime
import sys
import os
import django

# Set up Django settings

PROJECT_PATH = sys.argv[1]

sys.path.append(PROJECT_PATH)
os.environ.setdefault(
    'DJANGO_SETTINGS_MODULE', 'bibliotekanarynku9_api.settings'
)
django.setup()

# Deleting logic
from announcement.models import Announcement
from utils.logger import LOGGER

CURRENT_DATE = datetime.datetime.today()
OUTDATED_ANNOUNCEMENTS = Announcement.objects.filter(start_at__lt=CURRENT_DATE)
if OUTDATED_ANNOUNCEMENTS:
    ANNOUNCEMENTS_LENGTH = len(OUTDATED_ANNOUNCEMENTS)
    OUTDATED_ANNOUNCEMENTS.delete()
    LOGGER.info(
        f'Removed the {ANNOUNCEMENTS_LENGTH} outdated announcements '
        f'for {CURRENT_DATE} date.'
    )
else:
    LOGGER.info(
        f'There are not removed outdated announcements '
        f'for {CURRENT_DATE} date.'
    )
