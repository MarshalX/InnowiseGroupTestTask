from django.test import TransactionTestCase
from django.urls import reverse


class IndexViewTest(TransactionTestCase):
    fixtures = ['auth_user_initial_data.json', 'library_initial_data']
    reset_sequences = True

    def test_view_url_exists_at_desired_location(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)

    def test_view_url_accessible_by_name(self):
        response = self.client.get(reverse('index'))
        self.assertEqual(response.status_code, 200)

    def test_view_uses_correct_template(self):
        response = self.client.get(reverse('index'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'index.html')

    def test_view_post_with_invalid_form(self):
        data = {
            'username': 'Test',
            'password1': 'qwerty123',
        }

        response = self.client.post(reverse('index'), data=data)
        self.assertFormError(response, 'form', 'password2', 'Обязательное поле.')

    def test_view_post_with_valid_form(self):
        data = {
            'username': 'Test',
            'password1': 'qwerty123#$',
            'password2': 'qwerty123#$',
        }

        response = self.client.post(reverse('index'), data=data)
        self.assertContains(response, 'Успешно добавлен!')


class UserDetailsViewTest(TransactionTestCase):
    fixtures = ['auth_user_initial_data.json', 'library_initial_data']
    reset_sequences = True

    def test_view_url_redirect_to_desired_location(self):
        response = self.client.get('/user/1')
        self.assertEqual(response.status_code, 301)

    def test_view_url_exists_at_desired_location(self):
        response = self.client.get('/user/1/')
        self.assertEqual(response.status_code, 200)

    def test_view_url_accessible_by_name(self):
        response = self.client.get(reverse('user_details', kwargs={'pk': 1}))
        self.assertEqual(response.status_code, 200)

    def test_view_uses_correct_template(self):
        response = self.client.get(reverse('user_details', kwargs={'pk': 1}))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'user_details.html')

    def test_view_not_exists_user(self):
        response = self.client.get(reverse('user_details', kwargs={'pk': 200}))
        self.assertEqual(response.status_code, 404)

    def test_view_post_with_invalid_form(self):
        data = {
            'name': 'Test',
            'author': 1,
            'publication_year': 1900,
        }

        response = self.client.post(reverse('user_details', kwargs={'pk': 1}), data=data)
        self.assertFormError(response, 'form', 'pages', 'Обязательное поле.')

    def test_view_post_with_valid_form(self):
        data = {
            'name': 'Test',
            'author': 1,
            'publication_year': 1900,
            'pages': 10
        }

        response = self.client.post(reverse('user_details', kwargs={'pk': 1}), data=data)
        self.assertContains(response, 'Успешно добавлено!')


class BookEditViewViewTest(TransactionTestCase):
    fixtures = ['auth_user_initial_data.json', 'library_initial_data']
    reset_sequences = True

    def test_view_url_redirect_to_desired_location(self):
        response = self.client.get('/book/1/edit')
        self.assertEqual(response.status_code, 301)

    def test_view_url_exists_at_desired_location(self):
        response = self.client.get('/book/1/edit/')
        self.assertEqual(response.status_code, 200)

    def test_view_url_accessible_by_name(self):
        response = self.client.get(reverse('book_edit', kwargs={'pk': 1}))
        self.assertEqual(response.status_code, 200)

    def test_view_uses_correct_template(self):
        response = self.client.get(reverse('book_edit', kwargs={'pk': 1}))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'book_edit.html')

    def test_view_not_exists_book(self):
        response = self.client.get(reverse('book_edit', kwargs={'pk': 200}))
        self.assertEqual(response.status_code, 404)

    def test_view_post_with_invalid_form(self):
        data = {
            'name': 'Test',
            'author': 1,
            'publication_year': 1900,
        }

        response = self.client.post(reverse('book_edit', kwargs={'pk': 1}), data=data)
        self.assertFormError(response, 'form', 'pages', 'Обязательное поле.')

    def test_view_post_with_valid_form(self):
        data = {
            'name': 'Test',
            'author': 1,
            'publication_year': 1900,
            'pages': 10
        }

        response = self.client.post(reverse('book_edit', kwargs={'pk': 1}), data=data)
        self.assertContains(response, 'Успешно сохранено!')
