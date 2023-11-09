# Generated by Django 3.2.22 on 2023-11-09 12:18

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Tickets',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('updated_on', models.DateField(auto_now=True)),
                ('created_on', models.DateField(auto_now_add=True)),
                ('subject', models.TextField()),
                ('message', models.TextField()),
                ('ticket_status', models.IntegerField(choices=[(0, 'Awaiting review'), (1, 'Reviewed'), (2, 'Closed')], default=0)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-updated_on'],
            },
        ),
    ]