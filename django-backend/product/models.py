from django.db import models
from autoslug import AutoSlugField
from users.models import User

# Create your models here.

class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.FloatField()
    product_image = models.ImageField(upload_to="product")
    slug = AutoSlugField(populate_from='name')
    short_description = models.CharField(max_length=255, blank=True, null=True)
    full_description = models.TextField(max_length=1000, blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Cart(models.Model):
    user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE,
        null=True, 
        blank=True
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )
    quentity = models.IntegerField(default=1)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    @property
    def total_price(self):
        return int(self.product.price) * self.quentity
    
    def __str__(self):
        return f"{self.user} - {self.product}"
