from django.urls import path

from .views import IndexView, UserDetailsView

urlpatterns = [
    path('user/<int:id>/', UserDetailsView.as_view(), name='user_details'),
    path('', IndexView.as_view(), name='index'),
]
