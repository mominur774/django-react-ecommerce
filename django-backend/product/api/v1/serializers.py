from itertools import product
from rest_framework import serializers
from product.models import Product, Cart


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class CartSerializer(serializers.ModelSerializer):
    total_price = serializers.ReadOnlyField()
    products = ProductSerializer(source='product', read_only=True)

    class Meta:
        model = Cart
        fields = '__all__'
    
    def create(self, validated_data):
        user = self.context['request'].user
        cart, created = Cart.objects.update_or_create(
            user=user,
            product = validated_data.get('product', ''),
            defaults={'product': validated_data.get('product', '')}
        )
        if cart and not created:
            cart.quentity += 1
            cart.save()  
        return cart

class DecreseQuentitySerializer(serializers.ModelSerializer):
    total_price = serializers.ReadOnlyField()
    products = ProductSerializer(source='product', read_only=True)

    class Meta:
        model = Cart
        fields = '__all__'
    
    def create(self, validated_data):
        user = self.context['request'].user
        cart = Cart.objects.get(
            user=user,
            product = validated_data.get('product', ''),
        )
        if cart.quentity > 1:
            cart.quentity -= 1
            cart.save()
        return cart