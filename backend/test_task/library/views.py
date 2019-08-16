from rest_framework import viewsets

from .models import User, Book
from .serializers import BooksSerializer, UsersSerializer, ShortUsersSerializer


class BooksViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BooksSerializer


class UsersViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UsersSerializer


class ShortUsersViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = ShortUsersSerializer
