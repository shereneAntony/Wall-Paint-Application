from django.contrib import admin
from .models import Color,Texture, User, Wallpaper, ServiceBooking

admin.site.register(Color)
admin.site.register(Texture)
admin.site.register(User)
admin.site.register(Wallpaper)
admin.site.register(ServiceBooking)