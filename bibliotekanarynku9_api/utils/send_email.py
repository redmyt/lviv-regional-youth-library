"""
The send email util for sending emails to the user.
All of applications can import it and use.
"""

from smtplib import SMTPException
from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string
from utils.logger import LOGGER


EMAIL_TEMPLATES_PATH = 'emails/'


def send_email(recipient_list, template, ctx=None, subject='', message=''):
    """Function that provides sending email to the user"""

    from_email = settings.DEFAULT_FROM_EMAIL
    html_message = render_to_string(EMAIL_TEMPLATES_PATH + template, ctx)

    try:
        send_mail(subject, message, from_email, recipient_list,
                  fail_silently=False, html_message=html_message)
    except SMTPException as err:
        LOGGER.error(f'Failed send email to {recipient_list}')
        LOGGER.error(f'There is following SMTP error: {err}')
        return False
    return True
