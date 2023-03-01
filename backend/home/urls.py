from django.urls import path
from .views import AddRequestView

urlpatterns = [
    path('addrequest', AddRequestView.as_view(), name='add_request'),
]