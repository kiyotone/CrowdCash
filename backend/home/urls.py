from django.urls import path
from .views import AddRequestView, GetRequestView, MyRequestView, StartDealView, CompleteDealView, MyDealsView

urlpatterns = [
    path('addrequest', AddRequestView.as_view(), name='add_request'),
    path('getrequests', GetRequestView.as_view(), name='get_requests'),
    path('myrequests', MyRequestView.as_view(), name='my_requests'),
    path('startdeal', StartDealView.as_view(), name='start_deal'),
    path('completedeal', CompleteDealView.as_view(), name='complete_deal'),
    path('mydeals', MyDealsView.as_view(), name='my_deals')
]