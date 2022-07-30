from django.urls import path
from payment.api.v1 import views

app_name = 'payment'

urlpatterns = [
    path('create-payment-intent/', views.CreatePaymentIntent.as_view(), name='create-payment-intent'),
    path('retrieve-payment-intent/<uuid:idempotency_key>/', views.RetrievePaymentIntent.as_view(), name='retrieve-payment-intent'),
    path('payment-status', views.SetPaymentStatus.as_view(), name='payment-status'),
]
