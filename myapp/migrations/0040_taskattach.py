# Generated by Django 4.2.4 on 2023-08-10 05:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0039_remove_task1_task_attach'),
    ]

    operations = [
        migrations.CreateModel(
            name='Taskattach',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('attach_task', models.FileField(blank=True, null=True, upload_to='taskattach')),
                ('attachment_created', models.DateTimeField(auto_now_add=True)),
                ('task', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='myapp.task1')),
            ],
        ),
    ]
