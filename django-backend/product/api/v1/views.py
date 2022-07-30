from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView
from product.models import Cart, Product
from product.api.v1.serializers import CartSerializer, ProductSerializer, DecreseQuentitySerializer
from rest_framework.permissions import AllowAny


class ProductList(ListAPIView):
    permission_classes = (AllowAny, )
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductDetails(RetrieveAPIView):
    permission_classes = (AllowAny, )
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'slug'


class AddToCart(CreateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

class DecreaseQuentity(CreateAPIView):
    queryset = Cart.objects.all()
    serializer_class = DecreseQuentitySerializer

class CartDetails(RetrieveAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    lookup_field = 'pk'