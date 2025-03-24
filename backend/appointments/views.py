from django.shortcuts import render
from rest_framework import viewsets, filters
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from .models import HealthcareFacility, HealthcareProvider, HealthcareAsset
from .serializers import (
    UserSerializer,
    HealthcareFacilitySerializer,
    HealthcareProviderSerializer,
    HealthcareAssetSerializer
)

# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ['username', 'first_name', 'last_name', 'email']

class HealthcareFacilityViewSet(viewsets.ModelViewSet):
    queryset = HealthcareFacility.objects.all()
    serializer_class = HealthcareFacilitySerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'address']

class HealthcareProviderViewSet(viewsets.ModelViewSet):
    queryset = HealthcareProvider.objects.all()
    serializer_class = HealthcareProviderSerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ['user__first_name', 'user__last_name', 'specialization', 'facility__name']

class HealthcareAssetViewSet(viewsets.ModelViewSet):
    queryset = HealthcareAsset.objects.all()
    serializer_class = HealthcareAssetSerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'asset_type', 'facility__name']
