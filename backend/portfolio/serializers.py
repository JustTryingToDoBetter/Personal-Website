"""
Serializers for the portfolio application.

Serializers convert model instances to and from JSON representations. They
define the fields exposed via the API and implement basic validation. The
`ContactMessageSerializer` does not expose the `created_at` field on
creation to prevent clients from forging timestamps.
"""
from __future__ import annotations

from rest_framework import serializers  # type: ignore
from .models import Project, ContactMessage


class ProjectSerializer(serializers.ModelSerializer):
    """Serializer for the Project model exposing all fields."""

    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'image_url', 'created_at']


class ContactMessageSerializer(serializers.ModelSerializer):
    """Serializer for contact form messages.

    The `created_at` field is read-only. Basic validation ensures the
    provided email has a valid format and that all fields are non-empty.
    """

    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'message', 'created_at']
        read_only_fields = ['created_at']

    def validate(self, attrs):
        for field in ['name', 'email', 'message']:
            if not attrs.get(field):
                raise serializers.ValidationError({field: 'This field is required.'})
        return attrs