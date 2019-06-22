from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import User

DjangoUser = get_user_model()


@receiver(post_save, sender=DjangoUser)
def create_and_save_user(sender, instance, created, **kwargs):
    if created:
        User.objects.create(user=instance)
    instance.user.save()
