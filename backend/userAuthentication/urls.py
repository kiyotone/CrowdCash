from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from .views import RegisterView, GetUserView

urlpatterns = [
    path('token', TokenObtainPairView.as_view(), name='token_obtain_pair'), # Obtains a token from username and password(login)
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'), # Refreshes a token
    path('token/verify', TokenVerifyView.as_view(), name='token_verify'), # Verifies a token
    path('register', RegisterView.as_view(), name='register'), # Registers a new user
    path('user', GetUserView.as_view(), name='get_user') # Gets the current user
]
