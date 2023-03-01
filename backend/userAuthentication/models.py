from django.db import models
from django.contrib.auth.models import AbstractUser

from typing import Dict

# Create your models here.
class User(AbstractUser):
    
    address = models.CharField(max_length=100, blank=True)
    phone = models.CharField(max_length=100, blank=True, unique=True)
    date_of_birth = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.username
    
    def to_dict(self) -> dict:
        return {
            'id': self.id,
            'username': self.username
        }
