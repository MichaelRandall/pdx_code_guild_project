# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('guess_mod', '0002_auto_20150303_0051'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='game',
            name='game_date',
        ),
        migrations.AddField(
            model_name='game',
            name='game_start_date',
            field=models.DateField(null=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='game',
            name='game_start',
            field=models.TimeField(null=True),
            preserve_default=True,
        ),
    ]
