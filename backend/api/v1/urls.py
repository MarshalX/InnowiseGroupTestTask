from rest_framework import routers

from v1.views import BooksViewSet, UsersViewSet, ShortUsersViewSet


router = routers.DefaultRouter()
router.register(r'books', BooksViewSet)
router.register(r'short_user', ShortUsersViewSet)
router.register(r'user', UsersViewSet)
