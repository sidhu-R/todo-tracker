# Generated by Django 4.1.3 on 2023-08-02 05:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0016_alter_news_updates_news_catagory'),
    ]

    operations = [
        migrations.AlterField(
            model_name='news_updates',
            name='news_created',
            field=models.DateField(auto_now=True),
        ),
    ]
