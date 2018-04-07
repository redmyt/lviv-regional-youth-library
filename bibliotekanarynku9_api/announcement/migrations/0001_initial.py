# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-04-07 09:12
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('link', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Announcement',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('avatar', models.CharField(max_length=150)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('start_at', models.DateTimeField(null=True)),
                ('links', models.ManyToManyField(to='link.Link')),
            ],
        ),
        migrations.CreateModel(
            name='AnnouncementTranslation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=120)),
                ('language', models.IntegerField(choices=[(0, 'uk'), (1, 'en')], default=0)),
                ('description', models.CharField(max_length=512)),
                ('organizer', models.CharField(blank=True, max_length=120)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('announcement', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='announcement.Announcement')),
            ],
        ),
        migrations.AlterUniqueTogether(
            name='announcementtranslation',
            unique_together=set([('announcement', 'language')]),
        ),
    ]
