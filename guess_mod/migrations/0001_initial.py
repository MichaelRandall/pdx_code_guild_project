# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('game_date', models.DateField(auto_now_add=True)),
                ('game_start', models.TimeField(auto_now_add=True)),
                ('game_end', models.TimeField(null=True)),
                ('game_duration', models.TimeField(null=True)),
                ('total_moves', models.IntegerField(default=0)),
                ('incorrect_moves', models.IntegerField(default=0)),
                ('icon_set', models.CharField(max_length=100)),
                ('grid_count', models.IntegerField(default=0)),
                ('player', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Gamer',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('picture', models.ImageField(upload_to=b'profile_images', blank=True)),
                ('user', models.OneToOneField(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Moves',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('move_start', models.TimeField(null=True)),
                ('move_end', models.TimeField(null=True)),
                ('move_outcome', models.CharField(max_length=100)),
                ('game', models.ForeignKey(to='guess_mod.Game')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
