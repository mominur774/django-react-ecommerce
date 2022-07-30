from rest_framework import serializers
from payment.models import Payment
from order.models import PlaceOrder
import stripe
from django.db import IntegrityError, transaction
from django.conf import settings

stripe.api_key = getattr(settings, 'STRIPE_SECRET_KEY', '')

class CreatePaymentIntentSerializer(serializers.ModelSerializer):
    idempotency_key = serializers.UUIDField(write_only=True)

    class Meta:
        model = Payment
        fields = '__all__'
        read_only_fields = (
            'stripe_response',
            'stripe_payment_intention_id',
        )
    
    @transaction.atomic
    def create(self, validated_data):
        request = self.context['request']
        order_obj = PlaceOrder.objects.get(idempotency_key=validated_data['idempotency_key'], user=request.user)

        try:
            payment_intent = stripe.PaymentIntent.create(
                amount=int(order_obj.cart.total_price) * 100,
                currency=validated_data.get('currency', 'usd'),
                payment_method_types=['card'],
                receipt_email=request.user.email
            )

            payment = Payment.objects.create(
                stripe_response=payment_intent,
                stripe_payment_intention_id=payment_intent['id'],
                total_amount=order_obj.cart.total_price,
                order=order_obj,
                user=request.user,
                currency=validated_data.get('currency', 'usd'),
            )
            return payment

        except Exception as e:
            raise serializers.ValidationError(e)


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ('stripe_response', )


class PaymentSucceededSerializer(serializers.Serializer):
    idempotency_key = serializers.UUIDField(write_only=True)