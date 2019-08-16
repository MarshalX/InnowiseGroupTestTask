from django.contrib.auth import get_user_model

from rest_framework import serializers

from .models import Book, User

UserModel = get_user_model()


class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('username', 'date_joined')


class BooksSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Book
        fields = ('id', 'name', 'author', 'publication_year', 'pages')


class ShortUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'avatar', 'username', 'books_count')

    username = serializers.CharField(
        source='user.username',
        read_only=True
    )

    books_count = serializers.IntegerField(
        source='book_set.count',
        read_only=True
    )


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'avatar', 'user', 'books')

    user = UserModelSerializer()

    books = BooksSerializer(
        source='book_set',
        many=True
    )
