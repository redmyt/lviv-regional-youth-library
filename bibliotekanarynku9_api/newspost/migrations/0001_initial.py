# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-03-19 18:28
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='NewsPost',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('avatar', models.CharField(max_length=150)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='NewsPostTranslation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=120)),
                ('language', models.IntegerField(choices=[(0, 'uk'), (1, 'en')], default=0)),
                ('description', models.CharField(max_length=2048)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='newspost.NewsPost')),
            ],
        ),
        migrations.AlterUniqueTogether(
            name='newsposttranslation',
            unique_together=set([('post', 'language')]),
        ),
    ]