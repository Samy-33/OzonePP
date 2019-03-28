from django.contrib import admin
from .models import Contest, ContestRegistration, ContestAnnouncement


admin.site.register(Contest)
admin.site.register(ContestRegistration)
admin.site.register(ContestAnnouncement)