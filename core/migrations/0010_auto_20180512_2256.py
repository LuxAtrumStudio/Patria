# Generated by Django 2.0.3 on 2018-05-12 22:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0009_profile_google'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='github',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='profile',
            name='travis',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]
