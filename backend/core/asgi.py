"""
ASGI config for the core project.

This module exposes the ASGI application used by Django's development server
and any production ASGI deployments. It sets the default settings module
and retrieves the application callable from Django.

For more details, see Django's documentation:
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""
import os
from django.core.asgi import get_asgi_application  # type: ignore


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
application = get_asgi_application()