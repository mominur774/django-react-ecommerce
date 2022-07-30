from order.api.v1 import views
from django.urls import path

app_name = "order"

urlpatterns = [
    path('create-billing/', views.CreateBillingView.as_view(), name='create-billing'),
    path('billing-list/', views.BillingListView.as_view(), name='billing-list'),
    path('place-order/', views.PlaceOrderView.as_view(), name='place-order'),
]
