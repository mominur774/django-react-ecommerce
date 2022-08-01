from order.models import Billing, PlaceOrder
from order.api.v1.serializers import BillingSerializer, PlaceOrderSerializer
from rest_framework.generics import CreateAPIView, ListAPIView, DestroyAPIView, UpdateAPIView
from rest_framework.response import Response
from rest_framework import status


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


class OrderDeleteView(DestroyAPIView):
    queryset = PlaceOrder.objects.all()
    serializer_class = PlaceOrderSerializer
    lookup_field = 'pk'


class OrderCancelView(UpdateAPIView):
    queryset = PlaceOrder.objects.all()
    serializer_class = PlaceOrderSerializer
    lookup_field = 'pk'

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
