from django.shortcuts import render
from django.views import View

from .models import User


class IndexView(View):
    def get(self, request, aggregator=None, number=None):
        return render(request, 'index.html', context={'users': User.objects.all()})
