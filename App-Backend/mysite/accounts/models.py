from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(blank=True)

    def __str__(self):
        return self.user.username
    

    

class Design(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='designs')
    title = models.CharField(max_length=200, blank=True)
    color_hex = models.CharField(max_length=7, default='#ffffff')  # store like #ff0000
    image = models.ImageField(upload_to='designs/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.user.username} - {self.title or self.id}"

class Order(models.Model):
    STATUS_CHOICES = [
        ('pending','Pending'),
        ('processing','Processing'),
        ('shipped','Shipped'),
        ('delivered','Delivered'),
        ('cancelled','Cancelled'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    design = models.ForeignKey(Design, on_delete=models.SET_NULL, null=True, blank=True)
    address = models.TextField()  # store full address or JSON if you prefer
    lat = models.FloatField(null=True, blank=True)
    lng = models.FloatField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    shipped_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Order {self.pk} - {self.user.username} - {self.status}"

