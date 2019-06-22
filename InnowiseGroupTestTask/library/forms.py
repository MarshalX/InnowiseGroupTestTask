from django import forms
from django.contrib.auth import get_user_model

from .models import Book
DjangoUser = get_user_model()


class BookForm(forms.ModelForm):
    class Meta:
        model = Book
        fields = ('name', 'author', 'publication_year', 'pages')
