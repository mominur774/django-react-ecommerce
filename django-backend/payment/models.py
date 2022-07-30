from django.db import models
from users.models import User
from order.models import PlaceOrder

# Create your models here.


class Payment(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        blank=True,
        null=True
    )
    order = models.ForeignKey(
        PlaceOrder,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    stripe_response = models.JSONField(null=True, blank=True)
    stripe_payment_intention_id = models.CharField(max_length=255, unique=True, null=True, blank=True)
    total_amount = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True) # redundent with reservation
    currency = models.CharField(max_length=3, default='USD')
    payment_succeeded = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user} - {self.stripe_payment_intention_id}"