# Generated by Django 3.1.7 on 2022-07-28 16:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('order', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('stripe_response', models.JSONField(blank=True, null=True)),
                ('stripe_payment_intention_id', models.CharField(blank=True, max_length=255, null=True, unique=True)),
                ('total_amount', models.DecimalField(blank=True, decimal_places=2, max_digits=8, null=True)),
                ('currency', models.CharField(default='USD', max_length=3)),
                ('payment_succeeded', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('order', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='order.placeorder')),
            ],
        ),
    ]
