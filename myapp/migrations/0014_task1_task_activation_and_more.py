# Generated by Django 4.1.3 on 2023-07-21 12:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0013_news_updates_news_catagory'),
    ]

    operations = [
        migrations.AddField(
            model_name='task1',
            name='task_activation',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.AlterField(
            model_name='news_updates',
            name='news_catagory',
            field=models.CharField(choices=[('General', 'General'), ('Featured', 'Featured')], max_length=30),
        ),
    ]
