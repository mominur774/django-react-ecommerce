from django.shortcuts import get_object_or_404
from payment.api.v1.serializers import CreatePaymentIntentSerializer, PaymentSerializer, PaymentSucceededSerializer
from payment.models import Payment
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework import status


class CreatePaymentIntent(CreateAPIView):
    serializer_class = CreatePaymentIntentSerializer
    queryset = Payment.objects.all()

class RetrievePaymentIntent(RetrieveAPIView):
    serializer_class = PaymentSerializer

    def get_object(self):
        return get_object_or_404(Payment, order__idempotency_key=self.kwargs['idempotency_key']) 

class SetPaymentStatus(CreateAPIView):
    serializer_class = PaymentSucceededSerializer
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        payment = get_object_or_404(Payment, user=self.request.user, order__idempotency_key=self.request.data['idempotency_key'])
        payment.payment_succeeded = True
        payment.save()
        return Response(status=status.HTTP_200_OK)