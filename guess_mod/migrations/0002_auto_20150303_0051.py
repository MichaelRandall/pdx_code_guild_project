# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('guess_mod', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='moves',
            name='move_end',
            field=models.FloatField(default=0),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='moves',
            name='move_start',
            field=models.FloatField(default=0),
            preserve_default=True,
        ),
    ]
