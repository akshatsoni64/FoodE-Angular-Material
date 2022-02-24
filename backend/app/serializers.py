from rest_framework.serializers import ModelSerializer

from .models import *

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

        
class FoodSerializer(ModelSerializer):
    class Meta:
        model = Food
        fields = '__all__'

        
class CartSerializer(ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'

        
class CartDetailsSerializer(ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'
        depth = 2

        
class OrderSerializer(ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

        
class OrderDetailsSerializer(ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'
        depth = 2

        
class FavouritesSerializer(ModelSerializer):
    class Meta:
        model = Favourites
        fields = '__all__'

        
class FavouritesDetailsSerializer(ModelSerializer):
    class Meta:
        model = Favourites
        fields = '__all__'
        depth = 2