"""
Admin configuration for the portfolio application.

Registers the `Project` and `ContactMessage` models with the Django admin
interface to allow authenticated staff users to manage projects and view
incoming contact messages. Fields displayed in the list view are chosen
to surface useful information at a glance.
"""
from django.contrib import admin  # type: ignore
from .models import Project, ContactMessage


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at')
    search_fields = ('title', 'description')
    ordering = ('-created_at',)


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'created_at')
    search_fields = ('name', 'email', 'message')
    ordering = ('-created_at',)