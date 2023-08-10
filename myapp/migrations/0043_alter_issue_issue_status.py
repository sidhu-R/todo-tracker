# Generated by Django 4.2.4 on 2023-08-10 17:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0042_subtask_subtask_created'),
    ]

    operations = [
        migrations.AlterField(
            model_name='issue',
            name='issue_status',
            field=models.CharField(choices=[('Open', 'Open'), ('In Progress', 'In Progress'), ('Resolved,', 'Resolved')], max_length=50),
        ),
    ]
