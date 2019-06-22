from django.db import models
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

DjangoUser = get_user_model()


@receiver(post_save, sender=DjangoUser)
def create_and_save_user(sender, instance, created, **kwargs):
    if created:
        User.objects.create(user=instance)
    instance.user.save()


class Book(models.Model):
    class Meta:
        db_table = 'Book'
        verbose_name = 'Книга'
        verbose_name_plural = 'Книги'

    name = models.CharField(
        name='Название',
        max_length=255
    )
    author = models.CharField(
        name='Автор',
        verbose_name='Авторы',
        max_length=255
    )
    publication_year = models.IntegerField(
        name='Дата издания',
    )
    pages = models.IntegerField(
        name='Количество страниц'
    )
    user = models.ForeignKey('User', on_delete=models.DO_NOTHING, null=True)


class User(models.Model):
    class Meta:
        db_table = 'User'
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

    user = models.OneToOneField(DjangoUser, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.user)
