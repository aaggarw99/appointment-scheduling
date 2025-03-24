from django.contrib import admin
from .models import HealthcareFacility, HealthcareProvider, HealthcareAsset

@admin.register(HealthcareFacility)
class HealthcareFacilityAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'email')
    search_fields = ('name', 'address')

@admin.register(HealthcareProvider)
class HealthcareProviderAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'specialization', 'facility')
    search_fields = ('user__username', 'user__first_name', 'user__last_name', 'specialization', 'facility__name')
    list_filter = ('facility', 'specialization')

@admin.register(HealthcareAsset)
class HealthcareAssetAdmin(admin.ModelAdmin):
    list_display = ('name', 'asset_type', 'facility', 'is_active')
    search_fields = ('name', 'asset_type', 'facility__name')
    list_filter = ('facility', 'asset_type', 'is_active')
