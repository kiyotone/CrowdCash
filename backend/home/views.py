from .models import LoanRequest, Deal
from django.db import IntegrityError
from django.contrib.auth import get_user_model

# Rest Framework
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response

from typing import Mapping

User = get_user_model()

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
    
class GetRequestView(APIView):
    """Gets all requests from database"""

    def get(self, request: Request) -> Response:
        user = request.user
        # Get Loan Requests which are pending
        loan_requests = LoanRequest.objects.filter(status='pending', type='Loan')
        # Get Investment Requests which are pending
        investment_requests = LoanRequest.objects.filter(status='pending', type='Investment')
        loan_requests_json = []
        investment_requests_json = []

        for item in loan_requests:
            # Filter out requests of the user
            if item.author != user:
                loan_requests_json.append(item.to_dict())
        
        for item in investment_requests:
            print(item.to_dict())
            # Filter out requests of the user
            if item.author != user:
                investment_requests_json.append(item.to_dict())

        return Response({
            'loan_requests': loan_requests_json,
            'investment_requests': investment_requests_json
        }, status=status.HTTP_200_OK)
    
class MyRequestView(APIView):
     """Gets all requests of the user"""

     def get(self, request: Request):
         user = request.user
         # Get Loan Requests which are pending
         loan_requests = LoanRequest.objects.filter(author=user, type='Loan')
         # Get Investment Requests which are pending
         investment_requests = LoanRequest.objects.filter(author=user, type='Investment')
         loan_requests_json = []
         investment_requests_json = []

         for item in loan_requests:
             loan_requests_json.append(item.to_dict())
         
         for item in investment_requests:
             investment_requests_json.append(item.to_dict())

         return Response({
             'loan_requests': loan_requests_json,
             'investment_requests': investment_requests_json
         }, status=status.HTTP_200_OK)


class StartDealView(APIView):
    """Starts the deal with a user"""

    def get_data(self, request: Mapping) -> dict:
        try:
            id = request['id'] # Id of the request
            amount = request['amount'] # Amount of money requested
            interest = request['interest'] # Interest rate
            interest = float(interest)
            amount = int(amount)
            other_user = User.objects.get(id=request['userID'])
        except:
            return None
        
        return {
            'id': id,
            'amount': amount,
            'interest': interest,
            'user': other_user
        }

    def post(self, request: Request) -> Response:
        data = self.get_data(request.data)

        if not data:
            return Response({
                "message": "invalid data"
            }, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            loan_request = LoanRequest.objects.get(id=data['id'])
            loan_request.status = 'completed'
            loan_request.amount = data['amount']
            loan_request.save()
        except:
            return Response({'detail': 'Request does not exist'}, status=status.HTTP_404_NOT_FOUND)

        if loan_request.type == 'Loan':
            borrower = loan_request.author
            lender = data['user']
        else:
            borrower = data['user']
            lender = loan_request.author

        try:
            new_deal = Deal.objects.create(
                request=loan_request,
                lender=lender,
                borrower=borrower,
                interest=data['interest'],
                amount=data['amount']
            )
            new_deal.save()
        except IntegrityError:
            return Response({'detail': 'Deal already exists'}, status=status.HTTP_409_CONFLICT)        

        return Response({
            'message': 'Deal started successfully'
        }, status=status.HTTP_201_CREATED)
     
class completeDealView(APIView):
    """Completes the deal with a user"""

    def post(self, request: Request) -> Response:
        data = request.data

        try:
            deal = Deal.objects.get(id=data['id'])
        except:
            return Response({'detail': 'Deal does not exist'}, status=status.HTTP_404_NOT_FOUND)
        
        if deal.lender == request.User:
            deal.status = 'completed'
            deal.save()
        else:
            return Response({'detail': 'You are not the lender of this deal'}, status=status.HTTP_403_FORBIDDEN)

        return Response({
            'message': 'Deal completed successfully'
        }, status=status.HTTP_201_CREATED)


class MyDealsView(APIView):
    """Gets all deals of the user"""

    def get(self, request: Request):
        user = request.user
        # Get Loan Requests which are pending
        borrows = Deal.objects.filter(borrower=user)
        lends = Deal.objects.filter(lender=user)
        
        borrows_json = []
        lends_json = []

        for item in borrows:
            borrows_json.append(item.to_dict())
        
        for item in lends:
            lends_json.append(item.to_dict())

        return Response({
            'borrows': borrows_json,
            'lends': lends_json
        }, status=status.HTTP_200_OK)
