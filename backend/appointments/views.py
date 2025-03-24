from django.shortcuts import render
from rest_framework import viewsets, filters, status
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
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

class AppointmentSlotsView(APIView):
    def get(self, request):
        print(request)
        # provider_id = request.query_params.get('providerId')
        slots = self.find_slots();
        
        return Response(slots, status=status.HTTP_200_OK)

    def find_slots(self):
        # TODO: Hid find slots service

        return [
            {"id": 1, "providerId": "123", "time": "09:00 AM"},
            {"id": 2, "providerId": "456", "time": "09:00 AM"}
        ];