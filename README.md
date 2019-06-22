# Innowise Group test task
Тестовое задание №1 (для вакансии стажер-разработчик Python). С самим заданием можно ознакомиться по ссылке: [TASK.md](https://github.com/MarshalX/InnowiseGroupTestTask/blob/master/TASK.md).

# Установка, настройка, запуск
- Python 3.6+ и pip - [python.org](http://python.org);
- настроить виртуальное окружение (по желанию, но рекомендуемо);
- установить зависимости ```(pip install -r requirements.txt)```;
- поднять PostgreSQL сервер;
- настроить подключение к базе (или [сконфигурировать базу](https://github.com/MarshalX/InnowiseGroupTestTask/blob/master/InnowiseGroupTestTask/InnowiseGroupTestTask/settings.py#L69) с уже выставленными настройками);

Выставленные настройки:
```$xslt
'ENGINE': 'django.db.backends.postgresql_psycopg2',
'NAME': 'InnowiseGroupTestTask',
'USER': 'InnowiseGroup',
'PASSWORD': '123123123',
'HOST': 'localhost',
'PORT': '5432',
```
- сделать необходимые миграции путём ввода следующих комманд:
```$xslt
python manage.py migrate
python manage.py makemigrations library
python manage.py migrate
```
- применить fixtures:
```$xslt
python manage.py loaddata auto_user_initial_data
python manage.py loaddata library_initial_data
```
- запустить сервер
```$xslt
python manage.py runserver
```
- перейти по адресу [127.0.0.1:8000](http://127.0.0.1:8000/)

Примечание: для доступа к админ-панель воспользуйтесь командой ```python manage.py createsuperuser``` для создания учётной записи администратора

# Скриншоты
## Главная страница
- [X] Список пользователей
- [X] Форма добавления нового пользователя
- [X] Ссылка на книги определенного пользователя

![Главная страница](https://github.com/MarshalX/InnowiseGroupTestTask/raw/master/resources/screenshot-1.png?raw=true)

## Книги пользователя
- [X] Список книг которые читает пользователь
- [X] Форма добавлнеия новой книги текущему пользователю
- [X] Ссылка в названии книги для перехода к форме её редактирования

![Книги пользователя](https://github.com/MarshalX/InnowiseGroupTestTask/raw/master/resources/screenshot-2.png?raw=true)

## Редактирование книги

![Редактирование книги](https://github.com/MarshalX/InnowiseGroupTestTask/raw/master/resources/screenshot-3.png?raw=true)

