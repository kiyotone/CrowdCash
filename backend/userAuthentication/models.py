from django.db import models
from django.contrib.auth.models import AbstractUser

from typing import Dict

# Create your models here.
class User(AbstractUser):

    balance = models.IntegerField(default=0)

    def __str__(self):
        return self.username
    
    def to_dict(self) -> dict:
        return {
            'id': self.id,
            'username': self.username,
            'balance': self.balance
        }
