from django.urls import path
from .views import AddRequestView, GetRequestView

urlpatterns = [
    path('addrequest', AddRequestView.as_view(), name='add_request'),
    path('getrequests', GetRequestView.as_view(), name='get_requests'),
]