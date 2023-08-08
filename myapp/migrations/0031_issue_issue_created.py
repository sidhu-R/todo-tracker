# Generated by Django 4.2.4 on 2023-08-08 12:28

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0030_issue_issue_activation'),
    ]

    operations = [
        migrations.AddField(
            model_name='issue',
            name='issue_created',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
