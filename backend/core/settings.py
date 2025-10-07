"""
Django settings for the core project.

These settings configure Django's behavior across development, testing and
production environments. Where possible, values are sourced from
environment variables to ensure sensitive information (like the secret key
and database credentials) is not checked into version control. When a
variable is not provided, reasonable defaults are used to maintain
operability in a local development context.

For a complete list of settings and their purpose, see the Django docs:
https://docs.djangoproject.com/en/4.2/ref/settings/
"""
from __future__ import annotations

import os
from pathlib import Path
from typing import Any, List

import dj_database_url  # type: ignore


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv('DJANGO_SECRET_KEY', 'django-insecure-change-me')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.getenv('DJANGO_DEBUG', 'False').lower() in {'true', '1', 'yes'}

# When running on Heroku or behind a proxy, ensure the host header is
# validated. For local development you can set this to ['*'].
allowed_hosts_env = os.getenv('DJANGO_ALLOWED_HOSTS', 'localhost,127.0.0.1')
ALLOWED_HOSTS: List[str] = [host.strip() for host in allowed_hosts_env.split(',') if host.strip()]

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Third‑party apps
    'rest_framework',
    'corsheaders',
    # Local apps
    'portfolio',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'

# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases
default_db_url = 'sqlite:///' + str(BASE_DIR / 'db.sqlite3')
DATABASE_URL = os.getenv('DATABASE_URL', default_db_url)
DATABASES: dict[str, Any] = {
    'default': dj_database_url.parse(DATABASE_URL, conn_max_age=600)
}

# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Django REST framework configuration
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ],
}

# CORS configuration
# In production, set CORS_ALLOWED_ORIGINS to restrict domains that may call the API.
CORS_ALLOW_ALL_ORIGINS = os.getenv('CORS_ALLOW_ALL_ORIGINS', 'True').lower() in {'true', '1', 'yes'}
cors_origins = os.getenv('CORS_ALLOWED_ORIGINS', '')
if not CORS_ALLOW_ALL_ORIGINS and cors_origins:
    CORS_ALLOWED_ORIGINS: List[str] = [origin.strip() for origin in cors_origins.split(',') if origin.strip()]

# Heroku specific security settings
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SECURE_SSL_REDIRECT = os.getenv('DJANGO_SECURE_SSL_REDIRECT', 'False').lower() in {'true', '1', 'yes'}
# When behind a proxy like Heroku, ensure `X-Forwarded-Proto` header is respected
USE_X_FORWARDED_HOST = True
