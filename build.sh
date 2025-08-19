#!/usr/bin/env bash
set -o errexit

pip install -r requirements.txt
python manage.py collectstatic --noinput   # <- gathers static files
python manage.py migrate                   # <- applies DB migrations
