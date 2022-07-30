from django.contrib import admin
from order.models import Billing, PlaceOrder

# Register your models here.

admin.site.register(Billing)
admin.site.register(PlaceOrder)