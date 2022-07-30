from order.models import Billing, PlaceOrder
from rest_framework import serializers


class BillingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Billing
        fields = '__all__'
    

    def create(self, validated_data):
        user = self.context['request'].user
        billing = Billing.objects.create(
            user=user,
            **validated_data
        )
        return billing


class PlaceOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaceOrder
        fields = '__all__'
    
    def create(self, validated_data):
        user = self.context['request'].user
        order = PlaceOrder.objects.create(
            user=user,
            **validated_data
        )
        return order