# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-04-06 11:35
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('link', '0001_initial'),
        ('announcement', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='announcement',
            name='links',
            field=models.ManyToManyField(to='link.Link'),
        ),
    ]
