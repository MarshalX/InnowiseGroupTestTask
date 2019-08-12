#!/bin/sh
python manage.py migrate
python manage.py loaddata library/fixtures/auth_user_initial_data
python manage.py loaddata library/fixtures/library_initial_data
python manage.py runserver 0.0.0.0:8000
