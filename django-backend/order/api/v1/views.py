from order.models import Billing, PlaceOrder
from order.api.v1.serializers import BillingSerializer, PlaceOrderSerializer
from rest_framework.generics import CreateAPIView, ListAPIView


class CreateBillingView(CreateAPIView):
    queryset = Billing.objects.all()
    serializer_class = BillingSerializer


class BillingListView(ListAPIView):
    queryset = Billing.objects.all()
    serializer_class = BillingSerializer

    def get_queryset(self):
        return Billing.objects.filter(user=self.request.user)


class PlaceOrderView(CreateAPIView):
    queryset = PlaceOrder.objects.all()
    serializer_class = PlaceOrderSerializer


class OrderListView(ListAPIView):
    queryset = PlaceOrder.objects.all()
    serializer_class = PlaceOrderSerializer

    def get_queryset(self):
        return PlaceOrder.objects.filter(user=self.request.user, ordered=True)
