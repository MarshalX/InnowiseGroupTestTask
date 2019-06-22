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
        response = self.client.get(reverse('user_details', kwargs={'id': 1}))
        self.assertEqual(response.status_code, 200)

    def test_view_uses_correct_template(self):
        response = self.client.get(reverse('user_details', kwargs={'id': 1}))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'user_details.html')

    def test_view_not_exists_user(self):
        response = self.client.get('/user/200/')
        self.assertEqual(response.status_code, 404)


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
        response = self.client.get(reverse('book_edit', kwargs={'id': 1}))
        self.assertEqual(response.status_code, 200)

    def test_view_uses_correct_template(self):
        response = self.client.get(reverse('book_edit', kwargs={'id': 1}))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'book_edit.html')

    def test_view_not_exists_book(self):
        response = self.client.get('/book/200/edit/')
        self.assertEqual(response.status_code, 404)
