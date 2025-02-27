from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")),
    path("", include("docs.urls")),
    path("api/", include("shared.users.urls")),
    path("api/", include("patients.urls")),
    path("api/", include("pre_registrations.urls")),
    path("api/", include("occupancy.urls")),
    path("api/", include("protocols.urls")),
    path("api/", include("notifications.urls")),
]
