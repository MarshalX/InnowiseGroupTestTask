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
        fields = ('name', 'author', 'publication_year', 'pages')


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('avatar', 'user')

    user = UserModelSerializer()
