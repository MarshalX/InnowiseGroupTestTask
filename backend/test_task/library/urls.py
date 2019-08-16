from django.urls import path, include

from rest_framework import routers

from .views import BooksViewSet, UsersViewSet, ShortUsersViewSet


router = routers.DefaultRouter()
router.register(r'books', BooksViewSet)
router.register(r'short_user', ShortUsersViewSet)
router.register(r'user', UsersViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
