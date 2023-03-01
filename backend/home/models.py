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
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_requests', null=True)

    def to_dict(self):
        return {
            'id': self.id,
            'author': self.author.username,
            'title': self.title,
            'description': self.description,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'type': self.type,
            'status': self.status,
            'amount': self.amount,
            'min_interest': self.min_interest,
            'max_interest': self.max_interest,
            'receiver': self.receiver.username if self.receiver else None
        }



