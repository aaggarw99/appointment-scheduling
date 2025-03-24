from django.db import models
from django.contrib.auth.models import User

class HealthcareFacility(models.Model):
    name = models.CharField(max_length=200)
    address = models.TextField()
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    website = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class HealthcareProvider(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    facility = models.ForeignKey(HealthcareFacility, on_delete=models.CASCADE, related_name='providers')
    title = models.CharField(max_length=100)  # e.g., "Dr.", "RN", etc.
    specialization = models.CharField(max_length=200)
    license_number = models.CharField(max_length=50)
    bio = models.TextField(blank=True)
    profile_image = models.ImageField(upload_to='provider_images/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} {self.user.get_full_name()}"

class HealthcareAsset(models.Model):
    name = models.CharField(max_length=200)
    facility = models.ForeignKey(HealthcareFacility, on_delete=models.CASCADE, related_name='assets')
    asset_type = models.CharField(max_length=100)  # e.g., "MRI", "X-Ray", "Operating Room"
    description = models.TextField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.asset_type})"
