from django.contrib import admin
from .models import ResourceType
from .models import MedicalCenterCapacity
from .models import ResourceUsage
from .models import OccupancyHistory

admin.site.register(ResourceType)
admin.site.register(MedicalCenterCapacity)
admin.site.register(ResourceUsage)
admin.site.register(OccupancyHistory)
