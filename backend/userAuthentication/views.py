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

    def post(self, request: Request) -> Response:
        """Handle the HTTP POST request"""
        data = request.data
        username = data['username']
        password = data['password']
        


        if not username or not password:
            return Response({
                "username": ["This field is required"],
                "password": ["This field is required"]
            }, status=status.HTTP_400_BAD_REQUEST)

        # Attempt to create a new user
        try:
            user = User.objects.create_user(username=username, password=password)
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
    


