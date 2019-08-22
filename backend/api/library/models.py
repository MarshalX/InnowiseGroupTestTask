from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models import Avg

RATING_CHOICES = {(i, i) for i in range(1, 11)}


class Book(models.Model):
    class Meta:
        verbose_name = 'Книга'
        verbose_name_plural = 'Книги'

    name = models.CharField(
        verbose_name='Название',
        max_length=255
    )
    author = models.CharField(
        verbose_name='Автор',
        max_length=255
    )
    price = models.IntegerField(
        verbose_name='Цена'
    )
    pages = models.IntegerField(
        verbose_name='Количество страниц'
    )
    created_date = models.DateTimeField(
        auto_now=True,
        verbose_name='Дата создания'
    )
    updated_date = models.DateTimeField(
        auto_now=True,
        verbose_name='Дата изменения'
    )
    rating = models.PositiveSmallIntegerField(
        default=0,
        choices=RATING_CHOICES,
        verbose_name='Рейтинг'
    )
    user = models.ForeignKey('User', on_delete=models.DO_NOTHING, null=True, blank=True)

    def __str__(self):
        return f'{self.name} - {self.author} ({self.price})'


class User(AbstractUser):
    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

    avatar = models.ImageField(
        upload_to='avatars/',
        blank=True,
        null=True,
        verbose_name='Аватарка'
    )

    @property
    def avg_books_price(self):
        return self.book_set.aggregate(avg_price=Avg('price'))
