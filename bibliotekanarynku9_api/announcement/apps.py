from django.apps import AppConfig
from django.db.models.signals import post_save


class AnnouncementConfig(AppConfig):
    name = "announcement"

    def ready(self):
        """
        Register the Django signals that are related to the Announcement application.
        """

        from announcement.models import AnnouncementTranslation
        from announcement.receivers import synchronize_announcement_translation

        post_save.connect(
            synchronize_announcement_translation,
            sender=AnnouncementTranslation,
            dispatch_uid="announcement_translation_post_save_synchronization",
        )
