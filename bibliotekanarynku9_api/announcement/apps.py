from django.apps import AppConfig


class AnnouncementConfig(AppConfig):
    name = "announcement"

    def ready(self):
        """
        Register the Django signals that are related to the Announcement application.
        """

        from announcement.models import AnnouncementTranslation
        from announcement.signals import ANNOUNCEMENT_TRANSLATION_CREATED
        from announcement.receivers import synchronize_announcement_translation

        ANNOUNCEMENT_TRANSLATION_CREATED.connect(
            synchronize_announcement_translation,
            sender=AnnouncementTranslation,
            dispatch_uid="ANNOUNCEMENT_TRANSLATION_CREATED",
        )
