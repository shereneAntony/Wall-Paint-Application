from django.db import models


class Color(models.Model):
    category = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    combinations = models.TextField()
    picture = models.CharField(max_length=255, blank=True, null=True)
    litre= models.CharField(max_length=100, default='1 Litre')
    price = models.CharField(max_length=100, default='250')
    

    def __str__(self):
        return self.name

class Texture(models.Model):
    room = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    price = models.CharField(max_length=100)
    picture = models.CharField(max_length=255, blank=True, null=True)
    
    def __str__(self):
        return self.name

class Wallpaper(models.Model):
    color = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    price = models.CharField(max_length=100,default='4650')
    size = models.CharField(max_length=100,default='20.5 inches wide and 33 feet long')
    picture = models.CharField(max_length=255, blank=True, null=True)
    
    def __str__(self):
        return self.name
    
class User(models.Model):
    name=models.CharField(max_length=100)
    email=models.EmailField(unique=True)
    phone=models.CharField(max_length=10)
    address=models.TextField()
    password=models.CharField(max_length=128)

    def __str__(self):
        return self.name

class ServiceBooking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    service_name = models.CharField(max_length=100)
    service_price = models.CharField(max_length=100)
    preferred_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.name} - {self.service_name} on {self.preferred_date}"
    

# models.py
class Cart(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('booked', 'Booked'),
    )
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product_type = models.CharField(max_length=100)
    product_name = models.CharField(max_length=255)
    product_price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField()
    picture = models.CharField(max_length=255, null=True, blank=True)  
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')  

    def __str__(self):
        return f"{self.product_name} ({self.user.email})"


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product_type = models.CharField(max_length=100)
    product_name = models.CharField(max_length=100)
    product_price = models.FloatField()
    quantity = models.PositiveIntegerField()
    picture = models.CharField(max_length=255)
    delivery_date = models.DateField()
