# Generated by Django 4.2.4 on 2023-08-09 11:36

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0037_attachements_attach_created'),
    ]

    operations = [
        migrations.AddField(
            model_name='task1',
            name='Projectlist',
            field=models.ForeignKey(default='7', on_delete=django.db.models.deletion.CASCADE, to='myapp.projectlist'),
            preserve_default=False,
        ),
    ]