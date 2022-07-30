from order.models import Billing, PlaceOrder
from order.api.v1.serializers import BillingSerializer, PlaceOrderSerializer
from rest_framework.generics import CreateAPIView, ListAPIView


class CreateBillingView(CreateAPIView):
    queryset = Billing.objects.all()
    serializer_class = BillingSerializer

class BillingListView(ListAPIView):
    queryset = Billing.objects.all()
    serializer_class = BillingSerializer

class PlaceOrderView(CreateAPIView):
    queryset = PlaceOrder.objects.all()
    serializer_class = PlaceOrderSerializer