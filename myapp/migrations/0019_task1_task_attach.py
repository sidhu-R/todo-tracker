# Generated by Django 4.2.4 on 2023-08-04 11:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0018_alter_announce_ann_created'),
    ]

    operations = [
        migrations.AddField(
            model_name='task1',
            name='task_attach',
            field=models.FileField(blank=True, null=True, upload_to='taskattach'),
        ),
    ]
