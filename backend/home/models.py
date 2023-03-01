from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


# Create your models here.

class LoanRequest(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='requests')
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    type = models.CharField(max_length=100, null=False)
    status = models.CharField(max_length=100, default='pending')
    amount = models.IntegerField(null=False)
    min_interest = models.FloatField(null=False)
    max_interest = models.FloatField(null=False)



