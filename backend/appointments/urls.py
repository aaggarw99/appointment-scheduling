from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'facilities', views.HealthcareFacilityViewSet)
router.register(r'providers', views.HealthcareProviderViewSet)
router.register(r'assets', views.HealthcareAssetViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
