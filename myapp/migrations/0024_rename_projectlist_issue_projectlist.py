# Generated by Django 4.2.4 on 2023-08-04 11:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0023_rename_projectlist_issue_projectlist'),
    ]

    operations = [
        migrations.RenameField(
            model_name='issue',
            old_name='projectlist',
            new_name='Projectlist',
        ),
    ]