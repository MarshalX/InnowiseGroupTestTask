from django.test import TestCase

from library.models import Book, User


class UserModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        user = User.objects.create_user(
            username='Test',
            email='test@test.te',
            password='password'
        )

    def test_user_db_table(self):
        user = User.objects.get(username='Test')
        db_table = user._meta.db_table
        self.assertEquals(db_table, 'library_user')


class BookModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        user = User.objects.create_user(
            username='Test',
            email='test@test.te',
            password='password'
        )
        Book.objects.create(
            name='Big',
            author='Bob',
            pages=10,
            price=0,
            user=user
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

    def test_created_date_label(self):
        book = Book.objects.get(id=1)
        field_label = book._meta.get_field('created_date').verbose_name
        self.assertEquals(field_label, 'Дата создания')

    def test_updated_date_label(self):
        book = Book.objects.get(id=1)
        field_label = book._meta.get_field('updated_date').verbose_name
        self.assertEquals(field_label, 'Дата изменения')

    def test_pages_label(self):
        book = Book.objects.get(id=1)
        field_label = book._meta.get_field('pages').verbose_name
        self.assertEquals(field_label, 'Количество страниц')

    def test_object_name_is_book_name_dash_author_bracket_price_bracket(self):
        book = Book.objects.get(id=1)
        expected_object_name = f'{book.name} - {book.author} ({book.price})'
        self.assertEquals(expected_object_name, str(book))
