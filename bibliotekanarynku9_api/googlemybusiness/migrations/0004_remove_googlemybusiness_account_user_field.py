# -*- coding: utf-8 -*-
# Generated by Django 1.11.29 on 2020-07-23 12:34
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('googlemybusiness', '0003_migrate_googlemybusiness_user_email_data_to_email_field'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='googlemybusinessaccount',
            name='user',
        ),
    ]
