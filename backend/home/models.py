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
            'max_interest': self.max_interest
        }
    

class Deal(models.Model):
    lender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='lender')
    borrower = models.ForeignKey(User, on_delete=models.CASCADE, related_name='borrower')
    request = models.ForeignKey(LoanRequest, on_delete=models.CASCADE, related_name='request')
    amount = models.IntegerField(null=False)
    interest = models.FloatField(null=False)
    status = models.CharField(max_length=100, default='ongoing')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def to_dict(self):
        return {
            'id': self.id,
            'lender': self.lender.username,
            'borrower': self.borrower.username,
            'request': self.request.to_dict(),
            'amount': self.amount,
            'interest': self.interest,
            'status': self.status,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

