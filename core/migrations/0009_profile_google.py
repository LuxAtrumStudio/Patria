# Generated by Django 2.0.3 on 2018-04-03 05:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0008_auto_20180403_0530'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='google',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]