from django.urls import path

from .views import IndexView, UserDetailsView, BookEditView

urlpatterns = [
    path('book/<int:id>/edit/', BookEditView.as_view(), name='book_edit'),
    path('user/<int:id>/', UserDetailsView.as_view(), name='user_details'),
    path('', IndexView.as_view(), name='index'),
]
