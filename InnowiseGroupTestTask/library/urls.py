from django.urls import path

from .views import IndexView, UserDetailsView, BookEditView, UserDeleteView, UserEditView


urlpatterns = [
    path('book/<int:id_>/edit/', BookEditView.as_view(), name='book_edit'),
    path('user/<int:id_>/', UserDetailsView.as_view(), name='user_details'),
    path('user/<int:pk>/delete', UserDeleteView.as_view(), name='user_delete'),
    path('user/<int:pk>/edit', UserEditView.as_view(), name='user_edit'),
    path('', IndexView.as_view(), name='index'),
]
