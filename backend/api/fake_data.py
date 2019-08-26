import os
import random
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'api.settings')

from faker import Faker
fake = Faker()

import django
django.setup()

from library.models import Book, User


def create_users(num_entries):
    for _ in range(num_entries):
        first_name = fake.first_name()
        last_name = fake.last_name()
        avatar = fake.image_url()

        User.objects.create_user(
            username=f'{first_name}_{last_name}',
            avatar=avatar
        )


def create_books(num_entries):
    choices = ['Snake Of The Land', 'Army Of The North', 'Wives Without Glory', 'Priests Of The Prison',
               'Girls And Defenders', 'Slaves And Enemies', 'Wand Of Eternity', 'Spear Without Courage',
               'Meeting At The Future', 'Guarded By My Home', 'God Of The Ancestors', 'Owl Of Next Year',
               'Gods With Money', 'Butchers With Silver', 'Serpents And Witches', 'Serpents And Mice',
               'Murder Of Freedom', 'Love Of The World', 'Blood At The Dark', 'Eating At Myself']
    users = list(User.objects.all())

    for _ in range(num_entries):
        Book(
            name=random.choice(choices),
            author=fake.name(),
            price=fake.random_int(1, 9999),
            pages=fake.random_int(1, 10),
            created_date=fake.date_time_this_month(),
            updated_date=fake.date_time_this_month(),
            rating=fake.random_int(1, 10),
            user=random.choice(users)
        ).save()


def delete_data():
    Book.objects.all().delete()
    User.objects.all().delete()


if __name__ == '__main__':
    delete_data()

    create_users(20)
    create_books(35)
