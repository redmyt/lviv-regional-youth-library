"""Module that add the appropriate permissions to the admins group."""

from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from django.core.management import BaseCommand
from announcement.models import (Announcement,
                                 AnnouncementTranslation,
                                 AnnouncementTranslationLink)
# from author.models import Author, AuthorTranslation
from book.models import Book, BookTranslation
# from link.models import Link
from newspost.models import (NewsPost,
                             NewsPostTranslation,
                             NewsPostTranslationLink)
from presspost.models import (PressPost,
                              PressPostTranslation,
                              PressPostTranslationLink)


ADMINS_PERMISSIONS_MODELS = (
    Announcement,
    AnnouncementTranslation,
    AnnouncementTranslationLink,
    # Author,
    # AuthorTranslation,
    Book,
    BookTranslation,
    # Link,
    NewsPost,
    NewsPostTranslation,
    NewsPostTranslationLink,
    PressPost,
    PressPostTranslation,
    PressPostTranslationLink
)


class Command(BaseCommand):
    """Command for adding permissions."""

    help = 'Add the appropriate permissions to the Admins group'

    def handle(self, *args, **options):
        """Actions provided by using command."""

        try:
            admins_group = Group.objects.get(name='admins')
        except Group.DoesNotExist:
            self.stdout.write(
                self.style.ERROR('Cannot access to admins group'))
            return

        perms = []
        for model in ADMINS_PERMISSIONS_MODELS:
            content_type = ContentType.objects.get_for_model(model)
            current_model_perms = list(
                Permission.objects.filter(content_type=content_type))
            perms.extend(current_model_perms)

        admins_group.permissions.set(perms)
        self.stdout.write(
            self.style.SUCCESS('Permissions was successfully added'))
