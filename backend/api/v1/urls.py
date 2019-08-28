from django.urls import path, include
from rest_framework import routers

from v1.views import BooksViewSet, UsersViewSet, ShortUsersViewSet, MeView, LoginView, LogoutView,\
    GiveBookView, TakeBookView


router = routers.DefaultRouter()
router.register(r'books', BooksViewSet)
router.register(r'short_user', ShortUsersViewSet)
router.register(r'user', UsersViewSet)

v1 = [
    path('', include(router.urls)),

    path('give_book', GiveBookView.as_view()),
    path('take_book', TakeBookView.as_view()),

    path('me/', MeView.as_view()),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view())
]
