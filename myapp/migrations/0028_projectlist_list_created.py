# Generated by Django 4.2.4 on 2023-08-08 07:32

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0027_project_project_activation'),
    ]

    operations = [
        migrations.AddField(
            model_name='projectlist',
            name='list_created',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
