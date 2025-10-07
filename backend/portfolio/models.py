"""
Data models for the portfolio application.

This module defines two primary models:
  * Project: represents a portfolio item with a title, description, optional image
    URL and creation timestamp.
  * ContactMessage: captures messages submitted via the contact form, including
    the sender's name, email address, message body and timestamp.

Models automatically record their creation time and can be extended in the
future to support additional fields (e.g., tags, attachments).
"""
from __future__ import annotations

from django.db import models  # type: ignore


class Project(models.Model):
    """A portfolio project with descriptive information."""

    title = models.CharField(max_length=200)
    description = models.TextField()
    image_url = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Project'
        verbose_name_plural = 'Projects'

    def __str__(self) -> str:  # pragma: no cover
        return self.title


class ContactMessage(models.Model):
    """Represents a message sent via the site's contact form."""

    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Contact Message'
        verbose_name_plural = 'Contact Messages'

    def __str__(self) -> str:  # pragma: no cover
        return f"Message from {self.name} <{self.email}>"