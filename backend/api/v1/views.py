from django.contrib.auth import login, logout
from django.db.models import Avg
from rest_framework import permissions
from rest_framework import viewsets, views
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from library.models import User, Book
from v1.serializers import BookSerializer, UserSerializer, ShortUserSerializer, MeSerializer, LoginSerializer, \
    GiveBookSerializer, TakeBookSerializer


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.method in permissions.SAFE_METHODS or
            request.user and
            request.user.is_authenticated and
            request.user.is_staff
        )


class Pagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 5


class LoginView(views.APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data['user']
        login(request, user)

        return Response(UserSerializer(user).data)


class LogoutView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return self.post(request)

    def post(self, request):
        logout(request)

        return Response()


class MeView(views.APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response(MeSerializer(User.objects.prefetch_related('books').filter(id=request.user.id).first()).data)


class GiveBookView(views.APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [permissions.IsAdminUser]

    def post(self, request):
        serializer = GiveBookSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        book = serializer.validated_data['book']
        user = serializer.validated_data['user']

        book.user = user
        book.save()

        return Response(BookSerializer(book).data)


class TakeBookView(views.APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [permissions.IsAdminUser]

    def post(self, request):
        serializer = TakeBookSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        book = serializer.validated_data['book']

        book.user = None
        book.save()

        return Response(BookSerializer(book).data)


class BooksViewSet(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAdminOrReadOnly]

    queryset = Book.objects.get_queryset().order_by('-id')
    serializer_class = BookSerializer


class UsersViewSet(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    pagination_class = Pagination
    queryset = User.objects.prefetch_related('books').order_by('-id')
    serializer_class = UserSerializer

    def get_queryset(self):
        user = self.request.user
        qs = User.objects.prefetch_related('books').order_by('-id')

        if not user.is_staff:
            qs = qs.filter(id=user.id)

        return qs


class ShortUsersViewSet(viewsets.ReadOnlyModelViewSet):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    pagination_class = Pagination
    queryset = User.objects.prefetch_related('books').annotate(avg_price=Avg('books__price')).order_by('-id')
    serializer_class = ShortUserSerializer

    def get_queryset(self):
        user = self.request.user
        qs = User.objects.prefetch_related('books').annotate(avg_price=Avg('books__price')).order_by('-id')

        if not user.is_staff:
            qs = qs.filter(id=user.id)

        return qs
