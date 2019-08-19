from django.test import TestCase
from django.contrib.auth import get_user_model

from library.models import Book, User
UserModel = get_user_model()


class UserModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        user = UserModel.objects.create_user(
            username='Test',
            email='test@test.te',
            password='password'
        )

    def test_user_db_table(self):
        user = User.objects.get(user__username='Test')
        db_table = user._meta.db_table
        self.assertEquals(db_table, 'User')


class BookModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        user = UserModel.objects.create_user(
            username='Test',
            email='test@test.te',
            password='password'
        )
        Book.objects.create(
            name='Big',
            author='Bob',
            publication_year=2000,
            pages=10,
            user=user.user
        )

    def test_name_label(self):
        book = Book.objects.get(id=1)
        field_label = book._meta.get_field('name').verbose_name
        self.assertEquals(field_label, 'Название')

    def test_name_max_length(self):
        book = Book.objects.get(id=1)
        max_length = book._meta.get_field('name').max_length
        self.assertEquals(max_length, 255)

    def test_author_label(self):
        book = Book.objects.get(id=1)
        field_label = book._meta.get_field('author').verbose_name
        self.assertEquals(field_label, 'Автор')

    def test_author_max_length(self):
        book = Book.objects.get(id=1)
        max_length = book._meta.get_field('author').max_length
        self.assertEquals(max_length, 255)

    def test_publication_year_label(self):
        book = Book.objects.get(id=1)
        field_label = book._meta.get_field('publication_year').verbose_name
        self.assertEquals(field_label, 'Год издания')

    def test_pages_label(self):
        book = Book.objects.get(id=1)
        field_label = book._meta.get_field('pages').verbose_name
        self.assertEquals(field_label, 'Количество страниц')

    def test_object_name_is_book_name_dash_author_bracket_publication_year_bracket(self):
        book = Book.objects.get(id=1)
        expected_object_name = f'{book.name} - {book.author} ({book.publication_year})'
        self.assertEquals(expected_object_name, str(book))
