# Generated by Django 3.1.7 on 2022-07-31 17:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0004_placeorder_order_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='placeorder',
            name='ordered',
            field=models.BooleanField(default=False),
        ),
    ]
