from django.db.models.signals import pre_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from .models import Product
from django.db.models.signals import post_delete,post_save

@receiver(pre_save,sender=User)
def updateUser(sender , instance , **kwargs):
    user = instance
    if user.email != '':
        user.username = user.email



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

