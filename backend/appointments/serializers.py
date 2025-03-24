from rest_framework import serializers
from django.contrib.auth.models import User
from .models import HealthcareFacility, HealthcareProvider, HealthcareAsset

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email')

class HealthcareFacilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthcareFacility
        fields = '__all__'

class HealthcareProviderSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    facility = HealthcareFacilitySerializer(read_only=True)

    class Meta:
        model = HealthcareProvider
        fields = '__all__'

class HealthcareAssetSerializer(serializers.ModelSerializer):
    facility = HealthcareFacilitySerializer(read_only=True)

    class Meta:
        model = HealthcareAsset
        fields = '__all__'
