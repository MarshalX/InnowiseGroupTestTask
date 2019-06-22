from django.contrib import messages
from django.shortcuts import render, get_object_or_404
from django.views import View

from .models import User, Book
from .forms import BookForm


class IndexView(View):
    def get(self, request, aggregator=None, number=None):
        return render(request, 'index.html', context={'users': User.objects.all()})


class UserDetailsView(View):
    def get(self, request, id, aggregator=None, number=None):
        return render(request, 'user_details.html', context={'book': get_object_or_404(User, id=id)})


class BookEditView(View):
    def get(self, request, id, aggregator=None, number=None):
        return render(request, 'book_edit.html', context={'form': BookForm(
            instance=get_object_or_404(Book, id=id), auto_id=False)})

    def post(self, request, id):
        instance = get_object_or_404(Book, id=id)
        form = BookForm(request.POST, instance=instance, auto_id=False)

        if form.is_valid():
            form.save()
            messages.success(request, 'Успешно сохранено!')
        else:
            messages.error(request, 'Произошла ошибка при сохранении')

        return render(request, 'book_edit.html', context={'form': form})

