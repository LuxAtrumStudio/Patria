from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Dict(models.Model):
    name = models.CharField(max_length=50)

class KeyVal(models.Model):
    container = models.ForeignKey(Dict, db_index=True, on_delete=models.CASCADE)
    key = models.CharField(max_length=100, db_index=True)
    value = models.CharField(max_length=100, db_index=True)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    location = models.CharField(max_length=30, blank=True)
    keys = Dict()

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

