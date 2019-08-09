from django.db import models
from django.contrib.auth import get_user_model

UserModel = get_user_model()


class Book(models.Model):
    class Meta:
        db_table = 'Book'
        verbose_name = 'Книга'
        verbose_name_plural = 'Книги'

    name = models.CharField(
        name='name',
        verbose_name='Название',
        max_length=255
    )
    author = models.CharField(
        name='author',
        verbose_name='Автор',
        max_length=255
    )
    publication_year = models.IntegerField(
        name='publication_year',
        verbose_name='Год издания'
    )
    pages = models.IntegerField(
        name='pages',
        verbose_name='Количество страниц'
    )
    user = models.ForeignKey('User', on_delete=models.DO_NOTHING, null=True, blank=True)

    def __str__(self):
        return f'{self.name} - {self.author} ({self.publication_year})'


class User(models.Model):
    class Meta:
        db_table = 'User'
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

    user = models.OneToOneField(UserModel, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.user)
