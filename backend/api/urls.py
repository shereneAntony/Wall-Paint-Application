from django.urls import path
from .views import MyServicesView,MyOrdersView,CartItemsByUser,OrderCreateView, CartListView, CartDetailView,AddToCartView,ColorByTypeView,ColorDetailView, AllColorsView, texture_by_room, TextureDetailView,wallpaper_by_color,WallpaperDetailView, RegisterUserView,LoginUserView,BookServiceView,get_user_details
urlpatterns = [
    path('colors/type/<str:type>/', ColorByTypeView.as_view(), name='colors-by-type'),
    path('color/<int:pk>/', ColorDetailView.as_view(), name='color-detail'),
    path('colors/', AllColorsView, name='all-colors'),
    path('textures/', texture_by_room, name='all-textures'),   
    path('textures/<str:room>/', texture_by_room, name='texture-by-room'),
    path('texture/<int:pk>/', TextureDetailView.as_view(), name='texture-detail'),
    path('wallpapers/', wallpaper_by_color, name='all-wallpapers'),
    path('wallpapers/<str:color>/', wallpaper_by_color, name='wallpaper-by-color'),
    path('wallpaper/<int:pk>/', WallpaperDetailView.as_view(), name='wallpaper-detail'),
    path('register/', RegisterUserView.as_view(), name='register'),
    path('login/', LoginUserView.as_view(), name='login'),
    path('book-service/', BookServiceView.as_view(), name='book-service'),
    path('user-details/', get_user_details),
    path('add-to-cart/', AddToCartView.as_view(), name='add-to-cart'),
    path('cart-items/<int:pk>/', CartDetailView.as_view()),
    path('orders/', OrderCreateView.as_view()),
    path('cart-items/', CartItemsByUser.as_view(), name='cart-items'),
    path('my-orders/', MyOrdersView.as_view(), name='my-orders'),
     path('my-services/', MyServicesView.as_view(), name='my-services'),

    


 



]
