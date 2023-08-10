# Generated by Django 4.2.4 on 2023-08-10 17:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0043_alter_issue_issue_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='issue',
            name='issue_status',
            field=models.CharField(choices=[('Open', 'Open'), ('In Progress', 'In Progress'), ('Resolved', 'Resolved')], max_length=50),
        ),
    ]
