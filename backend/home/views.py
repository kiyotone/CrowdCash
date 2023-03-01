from .models import LoanRequest
from django.db import IntegrityError

# Rest Framework
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response

from typing import Mapping

# Create your views here.

class AddRequestView(APIView):
    """Adds a new request to database"""
    def get_data(self, request: Mapping) -> dict:
        try:
            title = request['title'] # Title of request
            description = request['description'] # Description of request
            amount = request['amount'] # Amount of money requested
            type = request['type'] # Type of request 'Loan' or 'Investment'
            min_interest = request['minInterest'] # Minimum interest rate
            max_interest = request['maxInterest'] # Maximum interest rate
            min_interest = float(min_interest)
            max_interest = float(max_interest)
            amount = int(amount)
        except:
            return None
        
        return {
            'title': title,
            'description': description,
            'amount': amount,
            'min_interest': min_interest,
            'max_interest': max_interest,
            'type': type
        }

    def post(self, request: Request) -> Response:
        data = self.get_data(request.data)

        if not data:
            return Response({
                "message": "invalid data"
            }, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            new_request = LoanRequest.objects.create(
                author=request.user,
                title=data['title'],
                description=data['description'],
                amount=data['amount'],
                min_interest=data['min_interest'],
                max_interest=data['max_interest'],
                type=data['type']
            )
            new_request.save()
        except IntegrityError:
            return Response({'detail': 'Request already exists'}, status=status.HTTP_409_CONFLICT)
        
        return Response({
            'message': 'Request created successfully'
        }, status=status.HTTP_201_CREATED)
    


