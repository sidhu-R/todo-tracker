# Generated by Django 4.2.4 on 2023-08-09 11:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0038_task1_projectlist'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='task1',
            name='task_attach',
        ),
    ]
