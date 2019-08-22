from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.core.exceptions import ValidationError

from rest_framework import serializers

from library.models import Book, User


class BookSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Book
        fields = ('id', 'name', 'author', 'price', 'pages', 'created_date', 'updated_date', 'rating')

    created_date = serializers.DateTimeField(
        read_only=True
    )

    updated_date = serializers.DateTimeField(
        read_only=True
    )


class ShortUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'avatar', 'username', 'books_count')

    books_count = serializers.IntegerField(
        source='book_set.count',
        read_only=True
    )


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'avatar', 'username', 'books', 'password', 'password_repeat')

    password = serializers.CharField(
        write_only=True,
        validators=(validate_password,),
        style={'input_type': 'password'}
    )
    password_repeat = serializers.CharField(
        write_only=True,
        style={'input_type': 'password'}
    )
    books = BookSerializer(
        source='book_set',
        read_only=True,
        many=True
    )

    def validate(self, attrs):
        username = attrs.get('username')

        errors = dict()

        try:
            UnicodeUsernameValidator(username)
        except ValidationError as e:
            errors['username'] = list(e.messages)

        if errors:
            raise serializers.ValidationError(errors)

        return super().validate(attrs)

    def create(self, validated_data):
        user = User(
            username=validated_data.get('username'),
            avatar=validated_data.get('avatar')
        )
        user.set_password(validated_data.get('password'))
        user.save()

        return user
