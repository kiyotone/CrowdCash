from .models import LoanRequest, Deal, KYC
from django.db import IntegrityError
from django.contrib.auth import get_user_model
from .OCR import KYC_verification

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
            description = request['description'] # Description of request
            amount = request['amount'] # Amount of money requested
            type = request['type'] # Type of request 'Loan' or 'Investment'
            final_amount = int(request['finalAmount']) # Final amount of money requested
            weeks = int(request['weeks']) # Number of weeks for the loan
            amount = int(amount)
        except:
            return None
        
        return {
            'description': description,
            'amount': amount,
            'final_amount': final_amount,
            'weeks': weeks,
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
                description=data['description'],
                amount=data['amount'],
                final_amount=data['final_amount'],
                weeks=data['weeks'],
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
            final_amount = int(request['finalAmount']) # Final amount of money requested
            weeks = int(request['weeks']) # Number of weeks for the loan
            amount = int(amount)
            other_user = User.objects.get(id=request['userID'])
        except:
            return None
        
        return {
            'id': id,
            'amount': amount,
            'final_amount': final_amount,
            'weeks': weeks,
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
            borrower = request.user
            lender = data['user']
        else:
            borrower = data['user']
            lender = request.user

        try:
            new_deal = Deal.objects.create(
                request=loan_request,
                lender=lender,
                borrower=borrower,
                final_amount=data['final_amount'],
                weeks=data['weeks'],
                amount=data['amount']
            )
            new_deal.save()
        except IntegrityError:
            return Response({'detail': 'Deal already exists'}, status=status.HTTP_409_CONFLICT)        

        return Response({
            'message': 'Deal started successfully'
        }, status=status.HTTP_201_CREATED)
     
class CompleteDealView(APIView):
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
    
class KYCView(APIView):
    """Gets and verifies user KYC"""

    def post(self, request: Request):
        data = request.data
        user = request.user

        try:
            img = data['img']
        except:
            return Response({'detail': 'Image does not exist'}, status=status.HTTP_404_NOT_FOUND)
        
        if KYC.objects.filter(user=user).exists():
            return Response({'detail': 'KYC already exists'}, status=status.HTTP_409_CONFLICT)

        try:
            kyc_data = KYC_verification(img)
        except:
            return Response({'detail': 'KYC verification failed'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            kyc = KYC.objects.create(
                user=user,
                dob=kyc_data['dob'],
                father_name=kyc_data['father_name'],
                citizenship_no=kyc_data['citizenship_no'],
                license_no=kyc_data['lisence_no']
            )
            kyc.save()
        except:
            return Response({'detail': 'Failed to save'}, status=status.HTTP_409_CONFLICT)
        
        return Response({'kyc': kyc.to_dict()}, status=status.HTTP_201_CREATED)
    

    def get(self, request: Request):
        user = request.user

        if not KYC.objects.filter(user=user).exists():
            return Response({'detail': 'KYC does not exist'}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({'kyc': KYC.objects.get(user=user).to_dict()}, status=status.HTTP_200_OK)
