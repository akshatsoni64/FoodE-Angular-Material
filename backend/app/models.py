from random import choice
from django.db import models

class User(models.Model):
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    type = models.CharField(max_length=255, choices=(
        ("admin", "Admin"),
        ("user", "User"),
    ))
    
    def __str__(self):
        return f"{self.username}"


class Food(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    price = models.PositiveIntegerField()
    
    def __str__(self):
        return f"{self.name}"


class Cart(models.Model):
    food = models.ForeignKey(Food, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total_price = models.PositiveIntegerField()
    active = models.BooleanField(default=True)
    
    def __str__(self):
        return f"{self.user.username} added {self.quantity} {self.food.name} to cart"


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    address = models.CharField(max_length=300)
    cart = models.ManyToManyField(Cart)
    total_price = models.PositiveIntegerField()
    
    def __str__(self):
        return f"{self.user.username}'s order"


class Favourites(models.Model):
    food = models.ForeignKey(Food, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.user.username} like {self.food.name}"
