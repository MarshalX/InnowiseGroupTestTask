. ../venv/bin/activate
coverage run --source='.' manage.py test library

if [[ "$1" == '--html' ]]; then
    coverage html
else
    coverage report
fi