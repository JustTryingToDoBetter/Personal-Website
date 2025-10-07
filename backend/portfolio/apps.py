"""
Configuration for the portfolio application.

This class enables Django to recognise the app and allows for future
customisation of application behaviour (such as signals).
"""
from django.apps import AppConfig  # type: ignore


class PortfolioConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'portfolio'