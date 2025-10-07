"""
Viewsets for the portfolio application.

These viewsets provide CRUD operations for `Project` instances and a
creation endpoint for `ContactMessage` instances. Permissions are set to
allow unauthenticated users to read projects and submit contact forms,
while restricting modification to authenticated users (e.g., via Django
admin or future API clients).
"""
from __future__ import annotations

from rest_framework import viewsets, permissions, status  # type: ignore
from rest_framework.response import Response  # type: ignore
from .models import Project, ContactMessage
from .serializers import ProjectSerializer, ContactMessageSerializer


class IsAdminOrReadOnly(permissions.BasePermission):
    """Custom permission to allow only admins to modify objects."""

    def has_permission(self, request, view):  # type: ignore
        # Safe methods are GET, HEAD or OPTIONS
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff


class ProjectViewSet(viewsets.ModelViewSet):
    """ViewSet for listing, retrieving and managing Projects."""

    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAdminOrReadOnly]


class ContactViewSet(viewsets.GenericViewSet, viewsets.mixins.CreateModelMixin):
    """ViewSet for creating contact messages.

    Only the `create` action is exposed to the public. Listing and
    retrieving messages is reserved for staff via the admin site.
    """

    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):  # type: ignore
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        # Return a generic success message rather than echoing the message
        return Response({'success': True, 'detail': 'Message received.'}, status=status.HTTP_201_CREATED, headers=headers)