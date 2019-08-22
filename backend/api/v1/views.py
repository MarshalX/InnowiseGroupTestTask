from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination

from library.models import User, Book
from v1.serializers import BookSerializer, UserSerializer, ShortUserSerializer


class Pagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 5

class BooksViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer


class UsersViewSet(viewsets.ModelViewSet):
    pagination_class = Pagination
    queryset = User.objects.get_queryset().order_by('id')
    serializer_class = UserSerializer


class ShortUsersViewSet(viewsets.ReadOnlyModelViewSet):
    pagination_class = Pagination
    queryset = User.objects.get_queryset().order_by('id')
    serializer_class = ShortUserSerializer
