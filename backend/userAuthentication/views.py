from django.db import IntegrityError
from .models import User

# Rest Framework and JWT_Auth
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken


# Create your views here.

class RegisterView(APIView):
    """Register a new user"""
    # Makes so that this view doesn't require authentication
    authentication_classes = []
    permission_classes = []

    bad_request = Response({
        "username": ["This field is required"],
        "password": ["This field is required"],
        "first_name": ["This field is required"],
        "last_name": ["This field is required"],
        "email": ["This field is required"],
        "address": ["This field is required"],
        "phone": ["This field is required"]
    }, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request: Request) -> Response:
        """Handle the HTTP POST request"""
        data = request.data

        try:
            username = data['username']
            password = data['password']
            first_name = data['first_name']
            last_name = data['last_name']
            email = data['email']
            address = data['address']
            phone = data['phone']
        except KeyError:
            return self.bad_request

        if not username or not password or not first_name or not last_name or not email or not address or not phone:
            return self.bad_request

        # Attempt to create a new user
        try:
            user: User = User.objects.create_user(username=username, password=password, first_name=first_name, last_name=last_name, email=email, address=address, phone=phone)
            user.save()
        except IntegrityError:
           return Response({'detail': 'User already exists'}, status=status.HTTP_409_CONFLICT)

        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }, status=status.HTTP_201_CREATED)
    
class GetUserView(APIView):
    """Get the current user"""
    def get(self, request: Request) -> Response:
        user: User = request.user

        return Response({"user": user.to_dict()}, status=status.HTTP_200_OK)
