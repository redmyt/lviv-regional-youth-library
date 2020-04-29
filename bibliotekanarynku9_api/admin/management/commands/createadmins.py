"""Module that providing creation of admins permissions group."""

from django.contrib.auth.models import Group
from django.core.management import BaseCommand


ADMINS_GROUP_NAME = 'admins'


class Command(BaseCommand):
    """Command for Admins group creation."""

    help = 'Create the Admins permissions group.'

    def handle(self, *args, **options):
        """Actions provided by using command."""

        admins = Group.objects.get_or_create(name=ADMINS_GROUP_NAME)

        if not admins:
            self.stdout.write(
                self.style.ERROR('Admins group are not accessible'))
            return

        self.stdout.write(
            self.style.SUCCESS('Admins group are available to use'))
