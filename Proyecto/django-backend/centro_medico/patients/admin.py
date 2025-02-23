from django.contrib import admin
from .models import Patient
from .models import PatientAdmission

admin.site.register(Patient)
admin.site.register(PatientAdmission)
