# Generated by Django 5.0.3 on 2024-03-15 17:36

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(blank=True, max_length=255, null=True)),
                ('image', models.URLField(blank=True, null=True)),
                ('productCount', models.IntegerField(default=0)),
                ('stockCount', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='DeliverySlot',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('date', models.CharField(blank=True, max_length=255, null=True)),
                ('startDatetime', models.CharField(blank=True, max_length=255, null=True)),
                ('duration', models.CharField(blank=True, max_length=255, null=True)),
                ('endDatetime', models.CharField(blank=True, max_length=255, null=True)),
                ('finalizationDatetime', models.CharField(blank=True, max_length=255, null=True)),
                ('leadTimeRequired', models.FloatField()),
                ('isPodAllowed', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Seller',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('storeName', models.CharField(max_length=100)),
                ('profileImage', models.URLField()),
            ],
        ),
        migrations.CreateModel(
            name='SEO',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('seoTitle', models.CharField(blank=True, max_length=200)),
                ('seoDescription', models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('paymentMethod', models.CharField(blank=True, max_length=200, null=True)),
                ('taxPrice', models.DecimalField(blank=True, decimal_places=2, max_digits=7, null=True)),
                ('shippingPrice', models.DecimalField(blank=True, decimal_places=2, max_digits=7, null=True)),
                ('totalPrice', models.DecimalField(blank=True, decimal_places=2, max_digits=7, null=True)),
                ('isPaid', models.BooleanField(default=False)),
                ('paidAt', models.DateTimeField(blank=True, null=True)),
                ('isDelivered', models.BooleanField(default=False)),
                ('deleveredAt', models.DateTimeField(blank=True, null=True)),
                ('createdAt', models.DateTimeField()),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(blank=True, max_length=255, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('isNPI', models.BooleanField(default=False)),
                ('listImage', models.URLField(blank=True, null=True)),
                ('listImage2', models.URLField(blank=True, null=True)),
                ('testReportImage', models.URLField(blank=True, null=True)),
                ('detailImage', models.URLField(blank=True, null=True)),
                ('price', models.DecimalField(blank=True, decimal_places=2, max_digits=7, null=True)),
                ('testReportDocument', models.URLField(blank=True, null=True)),
                ('measurementUnit', models.CharField(blank=True, max_length=20, null=True)),
                ('packageSize', models.CharField(blank=True, max_length=20, null=True)),
                ('ingredients', models.TextField(blank=True, null=True)),
                ('storage', models.TextField(blank=True, null=True)),
                ('usage', models.TextField(blank=True, null=True)),
                ('rating', models.FloatField(blank=True, null=True)),
                ('numReviews', models.IntegerField(default=0)),
                ('categoryTag', models.CharField(blank=True, max_length=100)),
                ('cuisineTag', models.CharField(blank=True, max_length=100)),
                ('specialityTag', models.CharField(blank=True, max_length=100)),
                ('quantityAvailable', models.IntegerField(default=0)),
                ('showStock', models.BooleanField(default=True)),
                ('isStockInHand', models.BooleanField(default=True)),
                ('vegIndicator', models.CharField(blank=True, max_length=20)),
                ('othersReviews', models.JSONField(default=list)),
                ('seo', models.JSONField(default=dict)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('edited_at', models.DateTimeField(auto_now=True)),
                ('category', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='products', to='base.category')),
                ('earliestDeliverySlot', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.deliveryslot')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
                ('user_order_items', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='product_user_order_items', to='base.category')),
                ('seller', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='base.seller')),
            ],
        ),
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(blank=True, max_length=200, null=True)),
                ('qty', models.IntegerField(blank=True, default=0, null=True)),
                ('price', models.DecimalField(blank=True, decimal_places=2, max_digits=7, null=True)),
                ('image', models.CharField(blank=True, max_length=200, null=True)),
                ('order', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.order')),
                ('product', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.product')),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('name', models.CharField(blank=True, max_length=200, null=True)),
                ('rating', models.IntegerField(blank=True, default=0, null=True)),
                ('comment', models.TextField(blank=True, null=True)),
                ('createdAt', models.DateTimeField(auto_now=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('product', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.product')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ShippingAddress',
            fields=[
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('address', models.CharField(blank=True, max_length=200, null=True)),
                ('city', models.CharField(blank=True, max_length=200, null=True)),
                ('postalCode', models.CharField(blank=True, max_length=200, null=True)),
                ('country', models.CharField(blank=True, max_length=200, null=True)),
                ('shippingPrice', models.DecimalField(blank=True, decimal_places=2, max_digits=7, null=True)),
                ('order', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='base.order')),
            ],
        ),
    ]
