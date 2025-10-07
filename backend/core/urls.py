"""
URL configuration for the core project.

This module wires together URL patterns for the Django admin, the REST API and any
additional applications. API endpoints are registered using the DRF router.

For more details, see:
https://docs.djangoproject.com/en/4.2/topics/http/urls/
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers  # type: ignore

from portfolio import views as portfolio_views


router = routers.DefaultRouter()
router.register(r'projects', portfolio_views.ProjectViewSet, basename='project')
router.register(r'contact', portfolio_views.ContactViewSet, basename='contact')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
]