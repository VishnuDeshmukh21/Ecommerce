from django.db import models

# Create your models here.
from django.contrib.auth.models import User
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from dirtyfields import DirtyFieldsMixin
#---------------------------------------------------------
from django.core.validators import MaxValueValidator
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db.models.signals import post_delete



# prev--------------------------------------------------------------------
# class Product(models.Model):
#   user = models.ForeignKey(User , on_delete=models.SET_NULL, null=True)
#   is_refrigerated=models.BooleanField(default=False, null=True)
#   name=models.CharField(max_length=200, null=True, blank=True)
#   image=models.ImageField(null=True, blank=True)
#   brand = models.CharField(max_length=200, null=True, blank=True)
#   category = models.CharField(max_length=200, null=True, blank=True)
#   description = models.TextField( null=True, blank=True)
#   ingredients=models.TextField( null=True, blank=True)
#   rating = models.DecimalField(max_digits=7,decimal_places=2,null=True, blank=True)
#   numReviews = models.IntegerField(null= True, blank=True , default=0)
#   price = models.DecimalField(max_digits=7,decimal_places=2,null=True, blank=True)
#   countInStock = models.IntegerField(null= True, blank=True , default=0)
#   createdAt = models.DateTimeField(auto_now=True)
#   _id = models.AutoField(primary_key=True, editable=False)

#   def __str__(self):
#     return f'{self.name}'

from django.db import models

    

class DeliverySlot(models.Model):
    id = models.IntegerField(primary_key=True)
    date = models.CharField(max_length=255, null=True, blank=True)
    startDatetime = models.CharField(max_length=255, null=True, blank=True)
    duration = models.CharField(max_length=255, null=True, blank=True)
    endDatetime = models.CharField(max_length=255, null=True, blank=True)
    finalizationDatetime = models.CharField(max_length=255, null=True, blank=True)
    leadTimeRequired = models.FloatField()
    isPodAllowed = models.BooleanField(default=False)

    def __str__(self):
        return f"Delivery Slot {self.id}"


class Category(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=255,null=True,blank=True)
    image = models.URLField(null=True,blank=True)
    productCount = models.IntegerField(default=0)
    stockCount = models.IntegerField(default=0)


    def __str__(self):
        return self.name
    

class Seller(models.Model):
    id = models.IntegerField(primary_key=True)
    storeName = models.CharField(max_length=100)
    profileImage = models.URLField()

    def __str__(self):
        return self.storeName

class SEO(models.Model):
    seoTitle = models.CharField(max_length=200, blank=True)
    seoDescription = models.TextField(blank=True)


class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    _id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    seller = models.ForeignKey(Seller, on_delete=models.CASCADE, null=True)
    isNPI = models.BooleanField(default=False)
    listImage = models.URLField(null=True, blank=True)
    listImage2 = models.URLField(null=True, blank=True)
    testReportImage = models.URLField(null=True, blank=True)
    detailImage = models.URLField(null=True, blank=True)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    testReportDocument = models.URLField(null=True, blank=True)
    measurementUnit = models.CharField(max_length=20, null=True, blank=True)
    packageSize = models.CharField(max_length=20, null=True, blank=True)
    ingredients = models.TextField(null=True, blank=True)
    storage = models.TextField(null=True, blank=True)
    usage = models.TextField(null=True, blank=True)
    rating = models.FloatField(null=True, blank=True)
    numReviews = models.IntegerField(default=0)
    categoryTag = models.CharField(max_length=100, blank=True)
    cuisineTag = models.CharField(max_length=100, blank=True)
    specialityTag = models.CharField(max_length=100, blank=True)
    quantityAvailable = models.IntegerField(default=0)
    showStock = models.BooleanField(default=True)
    isStockInHand = models.BooleanField(default=True)
    vegIndicator = models.CharField(max_length=20, blank=True)
    earliestDeliverySlot = models.ForeignKey(DeliverySlot, on_delete=models.SET_NULL, null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, related_name='products')
    user_order_items = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, related_name='product_user_order_items')  # Field for user order items
    othersReviews = models.JSONField(default=list)    # Field for other reviews
    seo = models.JSONField(default=dict)            # Field for SEO information
    created_at = models.DateTimeField(auto_now_add=True)
    edited_at = models.DateTimeField(auto_now=True, editable=False)
    

    def __str__(self):
        return self.name if self.name else f"Product {self._id}"



  
class Review(models.Model):
  user=models.ForeignKey(User, on_delete=models.SET_NULL , null=True)
  product=models.ForeignKey( Product , on_delete=models.SET_NULL, null =True)
  name = models.CharField(max_length=200, null=True , blank=True)
  rating = models.IntegerField(null= True, blank=True , default=0)
  comment = models.TextField(null=True,blank=True)
  createdAt = models.DateTimeField(auto_now=True)
  _id = models.AutoField(primary_key=True, editable=False)

  def __str__(self):
    return f'{self.product} {self.rating} {self.comment}'
  

class Order(models.Model):
  user = models.ForeignKey(User , on_delete=models.SET_NULL, null=True)
  paymentMethod=models.CharField(max_length=200, null=True, blank=True)
  taxPrice = models.DecimalField(max_digits=7,decimal_places=2,null=True, blank=True)
  shippingPrice = models.DecimalField(max_digits=7,decimal_places=2,null=True, blank=True)
  totalPrice =models.DecimalField(max_digits=7,decimal_places=2,null=True, blank=True)
  isPaid = models.BooleanField(default=False)
  paidAt = models.DateTimeField(auto_now_add=False,null=True,blank=True)
  isDelivered = models.BooleanField(default=False)
  deleveredAt = models.DateTimeField(auto_now_add=False,null=True,blank=True)
  createdAt = models.DateTimeField(auto_now_add=False)
  _id = models.AutoField(primary_key=True, editable=False)
 
  def __str__(self):
    return f'{self.createdAt}'


class OrderItem(models.Model):
  _id = models.AutoField(primary_key=True, editable=False)
  order = models.ForeignKey(Order,on_delete=models.SET_NULL , null=True)
  product = models.ForeignKey(Product,on_delete=models.SET_NULL , null=True)
  name = models.CharField(max_length=200, null=True,blank=True)
  qty = models.IntegerField(default=0,blank=True,null=True)
  price = models.DecimalField(max_digits=7,decimal_places=2,null=True, blank=True)
  image =  models.CharField(max_length=200, null=True,blank=True)

  def __str__(self):
    return f' {self.name}'


class ShippingAddress(models.Model):
  _id = models.AutoField(primary_key=True, editable=False)
  order = models.OneToOneField(Order, on_delete=models.CASCADE,null=True,blank=True)
  address=models.CharField(max_length=200, null=True, blank=True)
  city = models.CharField(max_length=200, null=True, blank=True)
  postalCode = models.CharField(max_length=200, null=True, blank=True)
  country =models.CharField(max_length=200, null=True, blank=True)
  shippingPrice = models.DecimalField(max_digits=7,decimal_places=2,null=True, blank=True)

  def __str__(self):
    return f'{self.address }'

@receiver(post_save, sender=Product)
def update_category_counts(sender, instance, created, **kwargs):
    if created and instance.category is not None:
        # Update product count
        instance.category.productCount += 1
        
        # Update stock count
        instance.category.stockCount += instance.quantityAvailable
        
        # Save the category object
        instance.category.save(update_fields=['productCount', 'stockCount'])

@receiver(post_delete, sender=Product)
def update_category_counts_on_delete(sender, instance, **kwargs):
    if instance.category is not None:
        # Update product count
        instance.category.productCount -= 1
        
        # Update stock count
        instance.category.stockCount -= instance.quantityAvailable
        
        # Save the category object
        instance.category.save(update_fields=['productCount', 'stockCount'])