# Generated by Django 3.2.22 on 2024-02-02 18:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0004_alter_event_event_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='adultevent',
            name='wants_box_spot',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='kidsevent',
            name='wants_box_spot',
            field=models.BooleanField(default=False),
        ),
    ]
