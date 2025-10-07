"""
WSGI config for the core project.

This module exposes the WSGI application used by Django's development server
and any production WSGI deployments (such as when running under gunicorn).
It sets the default settings module and retrieves the application callable
from Django.

For more details, see Django's documentation:
https://docs.djangoproject.com/en/4.2/howto/deployment/wsgi/
"""
import os
from django.core.wsgi import get_wsgi_application  # type: ignore


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
application = get_wsgi_application()