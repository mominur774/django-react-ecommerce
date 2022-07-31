from django.db import models
from django.utils.translation import ugettext_lazy as _


class OrderStatus(models.TextChoices):
    PENDING = 'Pending', _('Pending')
    PROCESSING = 'Processing', _('Processing')
    ORDERED = 'Ordered', _('Ordered')
    CANCELLED = 'Cancelled', _('Cancelled')
