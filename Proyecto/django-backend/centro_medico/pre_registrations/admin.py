from django.contrib import admin
from .models import PreRegistrationMedicalInfo
from .models import ThirdParty
from .models import PreRegistration

admin.site.register(PreRegistrationMedicalInfo)
admin.site.register(ThirdParty)
admin.site.register(PreRegistration)
