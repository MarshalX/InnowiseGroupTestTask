from django.contrib import messages
from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from django.views.generic.edit import DeleteView
from django.shortcuts import render, get_object_or_404
from django.views import View

from .models import User, Book
from .forms import BookForm


class IndexView(View):
    def get(self, request):
        context = {
            'users': User.objects.all(),
            'form': UserCreationForm()
        }

        return render(request, 'index.html', context=context)

    def post(self, request):
        context = {
            'users': User.objects.all(),
            'form': UserCreationForm()
        }

        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Успешно добавлен!')
        else:
            context.update({'form': form})
            messages.error(request, 'Произошла ошибка при добавлении')

        return render(request, 'index.html', context=context)


class UserDetailsView(View):
    def get(self, request, id_):
        context = {
            'books': get_object_or_404(User, id=id_).book_set.all(),
            'form': BookForm(auto_id=False)
        }

        return render(request, 'user_details.html', context=context)

    def post(self, request, id_):
        user = get_object_or_404(User, id=id_)
        form = BookForm(request.POST, auto_id=False)

        context = {
            'books': get_object_or_404(User, id=id_).book_set.all(),
            'form': form
        }

        if form.is_valid():
            book = form.save(commit=False)
            book.user = user
            book.save()

            messages.success(request, 'Успешно добавлено!')
            context.update({'form': BookForm(auto_id=False)})
        else:
            messages.error(request, 'Произошла ошибка при добавлении')

        return render(request, 'user_details.html', context=context)


class UserDeleteView(DeleteView):
    model = User
    success_url = reverse_lazy('index')


class BookEditView(View):
    def get(self, request, id_):
        return render(request, 'book_edit.html', context={'form': BookForm(
            instance=get_object_or_404(Book, id=id_), auto_id=False)})

    def post(self, request, id_):
        instance = get_object_or_404(Book, id=id_)
        form = BookForm(request.POST, instance=instance, auto_id=False)

        if form.is_valid():
            form.save()
            messages.success(request, 'Успешно сохранено!')
        else:
            messages.error(request, 'Произошла ошибка при сохранении')

        return render(request, 'book_edit.html', context={'form': form})

