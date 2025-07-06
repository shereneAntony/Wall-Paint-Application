from rest_framework import serializers
from .models import Color, Texture, Wallpaper, User, ServiceBooking, Cart, Order
from django.contrib.auth.hashers import make_password

class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = ['id', 'category', 'type', 'name', 'combinations', 'picture','litre', 'price']

   
class TextureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Texture
        fields = ['id', 'room', 'name', 'price', 'picture']

class WallpaperSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallpaper
        fields = ['id', 'color', 'name', 'price', 'size', 'picture']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])  # hash password
        return super().create(validated_data)
    
class ServiceBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceBooking
        fields = '__all__'



class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'