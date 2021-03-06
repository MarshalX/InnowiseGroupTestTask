from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.core.exceptions import ValidationError
from rest_framework import serializers

from library.models import Book, User


class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        super(DynamicFieldsModelSerializer, self).__init__(*args, **kwargs)

        if not self.context.get('request'):
            return

        fields = self.context['request'].query_params.get('fields')
        if fields:
            fields = fields.split(',')

            allowed = set(fields)
            existing = set(self.fields.keys())
            for field_name in existing - allowed:
                self.fields.pop(field_name)


class BookSerializer(DynamicFieldsModelSerializer, serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Book
        fields = ('id', 'name', 'author', 'pages', 'rating', 'price', 'user')

    user = serializers.PrimaryKeyRelatedField(queryset=User.objects, required=False)


class GiveBookSerializer(serializers.Serializer):
    book = serializers.IntegerField()
    user = serializers.IntegerField()

    def validate(self, attrs):
        errors = {}

        try:
            book = Book.objects.get(id=attrs['book'])

            if book.user is not None:
                raise AttributeError()

        except Book.DoesNotExist:
            errors['book'] = 'Книга не найдена.'
        except AttributeError:
            errors['book'] = 'Данная книга уже кому-то выдана.'

        try:
            user = User.objects.get(id=attrs['user'])
        except User.DoesNotExist:
            errors['user'] = 'Пользователь не найден.'

        if errors:
            raise serializers.ValidationError(errors)

        return {'book': book, 'user': user}


class TakeBookSerializer(serializers.Serializer):
    book = serializers.IntegerField()

    def validate(self, attrs):
        errors = {}

        try:
            book = Book.objects.get(id=attrs['book'])

            if book.user is None:
                raise AttributeError()

        except Book.DoesNotExist:
            errors['book'] = 'Книга не найдна.'
        except AttributeError:
            errors['book'] = 'Книга никому не выдана.'

        if errors:
            raise serializers.ValidationError(errors)

        return {'book': book}


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        user = authenticate(username=attrs['username'], password=attrs['password'])

        if not user:
            raise serializers.ValidationError('Неправильный логин или пароль.')

        if not user.is_active:
            raise serializers.ValidationError('Пользователь заблокирован')

        return {'user': user}


class MeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'is_staff', 'avatar', 'date_joined')


class ShortUserSerializer(DynamicFieldsModelSerializer, serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'avatar', 'username', 'books_count', 'avg_books_price')

    avg_books_price = serializers.SerializerMethodField()

    def get_avg_books_price(self, obj):
        return obj.avg_price

    books_count = serializers.IntegerField(
        source='books.count',
        read_only=True
    )


class UserSerializer(DynamicFieldsModelSerializer, serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'avatar', 'username', 'books', 'password')

    password = serializers.CharField(
        write_only=True,
        validators=(validate_password,),
        style={'input_type': 'password'},
        required=False
    )
    books = BookSerializer(
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
