from django.test import TestCase

from library.forms import BookForm


class BookFormTest(TestCase):
    data = {
        'name': 'TestName',
        'author': 'TestAuthor',
        'publication_year': 2020,
        'pages': 20,
    }

    def test_book_form_on_valid(self):
        form = BookForm(data=self.data)
        self.assertTrue(form.is_valid())

    def test_book_form_name_max(self):
        data = self.data.copy().update({'name': 'str' * 100})
        form = BookForm(data=data)
        self.assertFalse(form.is_valid())

    def test_book_form_author_max(self):
        data = self.data.copy().update({'author': 'str' * 100})
        form = BookForm(data=data)
        self.assertFalse(form.is_valid())

    def test_book_form_publication_year_not_integer(self):
        data = self.data.copy().update({'publication_year': '100'})
        form = BookForm(data=data)
        self.assertFalse(form.is_valid())

    def test_book_form_pages_not_integer(self):
        data = self.data.copy().update({'pages': '100'})
        form = BookForm(data=data)
        self.assertFalse(form.is_valid())
