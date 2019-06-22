from django.shortcuts import render, get_object_or_404
from django.views import View

from .models import User


class IndexView(View):
    def get(self, request, aggregator=None, number=None):
        return render(request, 'index.html', context={'users': User.objects.all()})


class UserDetailsView(View):
    def get(self, request, id, aggregator=None, number=None):
        return render(request, 'user_details.html', context={'book': get_object_or_404(User, id=id)})
