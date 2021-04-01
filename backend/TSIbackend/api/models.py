from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


# Create your models here.

# holds generic infomration about stock
class Stock(models.Model):
    ticker = models.CharField(max_length=10,unique=True)
    description = models.CharField(max_length=300)
    fullName = models.CharField(max_length=20)

# holds time based data about stock
class StockData(models.Model):
    stock = models.ForeignKey(Stock, on_delete=models.CASCADE)
    timestamp = models.TimeField(auto_now=False,auto_now_add=False)
    interval = models.CharField(max_length=10)
    _open = models.DecimalField(max_digits=7,decimal_places=2)
    close = models.DecimalField(max_digits=7,decimal_places=2)
    SMA = models.DecimalField(max_digits=7,decimal_places=2)
    VMA = models.DecimalField(max_digits=7,decimal_places=2)
    VWAP = models.DecimalField(max_digits=7,decimal_places=2)
    RSI = models.DecimalField(max_digits=7,decimal_places=2)

# profile to hold user phone number and their investment type
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phoneNumber = models.CharField(max_length=12)

    investmentType = (
        (0,"LOWRISK"),
        (1,"HIGHRISK"),
    )

    investmentType = models.IntegerField(choices=investmentType)



# code to update the user profile whenerver the user is editted
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()


class FavStock(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stock = models.ForeignKey(Stock, on_delete=models.CASCADE)
    