from django.contrib import admin
from .models import Specialty
from .models import SubSpecialty
from .models import Protocol

admin.site.register(Specialty)
admin.site.register(SubSpecialty)
admin.site.register(Protocol)
