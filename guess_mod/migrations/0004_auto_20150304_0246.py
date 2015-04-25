# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('guess_mod', '0003_auto_20150304_0234'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='game_end',
            field=models.FloatField(default=0),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='game',
            name='game_start',
            field=models.FloatField(default=0),
            preserve_default=True,
        ),
    ]
