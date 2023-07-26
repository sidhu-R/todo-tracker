# Generated by Django 4.1.3 on 2023-07-11 08:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('myapp', '0007_user_profile2_notif_acc'),
    ]

    operations = [
        migrations.CreateModel(
            name='news_updates',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('news_title', models.CharField(max_length=100)),
                ('news_desc', models.CharField(max_length=500)),
                ('news_img', models.ImageField(blank=True, upload_to='news')),
                ('news_created', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
