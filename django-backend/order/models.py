from django.db import models
from users.models import User
from product.models import Cart
import uuid
from users.enum_helper import OrderStatus

# Create your models here.


class Billing(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    zip = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user}'s billing"


class PlaceOrder(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )
    billing = models.ForeignKey(
        Billing,
        on_delete=models.CASCADE
    )
    cart = models.ForeignKey(
        Cart,
        on_delete=models.CASCADE
    )
    idempotency_key = models.UUIDField(default=uuid.uuid4, unique=True)
    order_status = models.CharField(
        max_length=255, choices=OrderStatus.choices, default="Pending")
    ordered = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user}'s order"
