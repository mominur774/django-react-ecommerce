from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView
from product.models import Cart, Product
from product.api.v1.serializers import CartSerializer, ProductSerializer, DecreseQuentitySerializer
from rest_framework.permissions import AllowAny

from django.http import Http404


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

    def get_object(self):
        try:
            return Cart.objects.get(pk=self.kwargs['pk'], user=self.request.user)
        except Cart.DoesNotExist:
            raise Http404


class CartListView(ListAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user, ordered=False)
