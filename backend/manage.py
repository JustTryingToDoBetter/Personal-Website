#!/usr/bin/env python
"""
This module is the entry point for Django's command-line utility for administrative tasks.
It exposes a `main` function that loads the Django settings and executes the appropriate
management command. When deploying to Heroku (or running locally), you can use this file
to perform migrations, create superusers, and run the development server.

For more information, see https://docs.djangoproject.com/en/4.2/howto/custom-management-commands/.
"""
import os
import sys


def main() -> None:
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
    try:
        from django.core.management import execute_from_command_line  # type: ignore
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()