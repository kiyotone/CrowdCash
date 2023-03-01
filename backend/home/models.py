from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


# Create your models here.

class LoanRequest(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='requests')
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    type = models.CharField(max_length=100, null=False)
    status = models.CharField(max_length=100, default='pending')
    amount = models.IntegerField(null=False)
    final_amount = models.IntegerField(null=False)
    weeks = models.IntegerField(null=False)

    def to_dict(self):
        return {
            'id': self.id,
            'author': self.author.to_dict(),
            'description': self.description,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'type': self.type,
            'status': self.status,
            'amount': self.amount,
            'finaAmount': self.final_amount,
            'weeks': self.weeks
        }
    

class Deal(models.Model):
    lender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='lender')
    borrower = models.ForeignKey(User, on_delete=models.CASCADE, related_name='borrower')
    request = models.ForeignKey(LoanRequest, on_delete=models.CASCADE, related_name='request')
    amount = models.IntegerField(null=False)
    final_amount = models.IntegerField(null=False)
    weeks = models.IntegerField(null=False)
    status = models.CharField(max_length=100, default='ongoing')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def to_dict(self):
        return {
            'id': self.id,
            'lender': self.lender.to_dict(),
            'borrower': self.borrower.to_dict(),
            'request': self.request.to_dict(),
            'amount': self.amount,
            'finalAmount': self.final_amount,
            'weeks': self.weeks,
            'status': self.status,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

