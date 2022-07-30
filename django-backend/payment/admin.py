from django.contrib import admin
from payment.models import Payment

# Register your models here.

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ['user', 'stripe_response', 'stripe_payment_intention_id', 'total_amount', 'currency', 'payment_succeeded']
    search_fields = ["user", "currency"]
    list_filter = ('user', 'currency')