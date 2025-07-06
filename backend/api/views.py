from django.shortcuts import render
from django.conf import settings
from datetime import timedelta
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Color, Texture, Wallpaper, User, ServiceBooking, Cart, Order
from .serializers import ColorSerializer,TextureSerializer, WallpaperSerializer, UserSerializer, ServiceBookingSerializer, CartSerializer, OrderSerializer
from rest_framework.generics import RetrieveAPIView,CreateAPIView, RetrieveUpdateDestroyAPIView, ListCreateAPIView
from rest_framework.decorators import api_view
from django.db.models import Q
from rest_framework import status,viewsets
from django.contrib.auth.hashers import check_password
from django.core.mail import send_mail

class ColorByTypeView(APIView):
    def get(self, request, type):
        # Filter all colors by given type
        colors = Color.objects.filter(type=type)

        # Group by category
        grouped_colors = {}
        for color in colors:
            category_name = color.category
            if category_name not in grouped_colors:
                grouped_colors[category_name] = []
            grouped_colors[category_name].append(ColorSerializer(color).data)

        return Response(grouped_colors)

class ColorDetailView(RetrieveAPIView):
    queryset = Color.objects.all()
    serializer_class = ColorSerializer

@api_view(['GET'])
def AllColorsView(request):
    search = request.GET.get('search', '').strip().lower()
    if search:
        colors = Color.objects.filter(
            Q(type__icontains=search) | Q(category__icontains=search)
        )
    else:
        colors = Color.objects.all()

    serializer = ColorSerializer(colors, many=True)
    return Response(serializer.data)



@api_view(['GET'])
def texture_by_room(request, room=None):
    if room:
        textures = Texture.objects.filter(room__icontains=room)
    else:
        textures = Texture.objects.all()
    serializer = TextureSerializer(textures, many=True)
    return Response(serializer.data)

class TextureDetailView(RetrieveAPIView):
    queryset = Texture.objects.all()
    serializer_class = TextureSerializer


@api_view(['GET'])
def wallpaper_by_color(request, color=None):
    if color:
        wallpapers = Wallpaper.objects.filter(color__icontains=color)
    else:
        wallpapers = Wallpaper.objects.all()
    serializer = WallpaperSerializer(wallpapers, many=True)
    return Response(serializer.data)

class WallpaperDetailView(RetrieveAPIView):
    queryset = Wallpaper.objects.all()
    serializer_class = WallpaperSerializer

class RegisterUserView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class LoginUserView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        try:
            user = User.objects.get(email=email)
            if check_password(password, user.password):
                return Response({
                    "message": "Login successful",
                    "user": {
                        "name": user.name,      
                        "email": user.email,
                    }
                }, status=status.HTTP_200_OK)
            return Response({"error": "Invalid password"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        
class BookServiceView(APIView):
    def post(self, request):
        serializer = ServiceBookingSerializer(data=request.data)
        if serializer.is_valid():
            booking = serializer.save()

         
            user = booking.user
            subject = f"Booking Confirmed: {booking.service_name}"
            message = f"""
Dear {user.name},

Your service booking for "{booking.service_name}" has been confirmed!

📅 Preferred Date: {booking.preferred_date}
💰 Price: ₹{booking.service_price}

We look forward to serving you on the chosen date.

Best regards,  
Color It Team
            """.strip()
            recipient = user.email

            # Send email
            send_mail(subject, message, None, [recipient])

            return Response({"message": "Service booked and email sent!"}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




@api_view(['GET'])
def get_user_details(request):
    email = request.GET.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=400)

    try:
        user = User.objects.get(email=email)
        return Response({
            'id': user.id, 
            'name': user.name,
            'email': user.email,
            'phone': user.phone,
            'address': user.address,
        })
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=404)
    


class AddToCartView(APIView):

    def post(self, request,*args,**kwargs):
        serializer = CartSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Item added to cart!"}, status=201)
        return Response(serializer.errors, status=400)


class CartListView(ListCreateAPIView):
    serializer_class = CartSerializer

    def get_queryset(self):
        user_id = self.request.query_params.get('user_id')
        return Cart.objects.filter(user_id=user_id)


class CartDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer


class OrderCreateView(APIView):
    def post(self, request, *args, **kwargs):
        orders_data = request.data.get('orders', [])
        user_id = request.data.get('user')

        from .models import User  
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)

        for item in orders_data:
            item['user'] = user_id
            serializer = OrderSerializer(data=item)
            if serializer.is_valid():
                serializer.save()
                cart_id = item.get('cart_id')
                if cart_id:
                    Cart.objects.filter(id=cart_id).update(status='booked')
            else:
                print(serializer.errors)
                return Response(serializer.errors, status=400)

       
        delivery_date = (timezone.now() + timedelta(days=3)).date()
        message = (
            f"Dear {user.name},\n\n"
            f"Your order has been successfully placed!\n"
            f"Your items will be delivered by {delivery_date}.\n\n"
            f"Best regards,\nColor It Team"
        )

        send_mail(
            subject="ColorIt - Booking Confirmation",
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
            fail_silently=False,
        )

        return Response({'message': 'Order placed and cart updated!', 'delivery_date': str(delivery_date)}, status=201)

       


class CartItemsByUser(APIView):
    def get(self, request):
        user_id = request.GET.get('user_id')
        status_filter = request.GET.get('status')  

        if not user_id:
            return Response({"error": "user_id required"}, status=400)

        if status_filter:
            items = Cart.objects.filter(user_id=user_id, status=status_filter)
        else:
            items = Cart.objects.filter(user_id=user_id)

        serializer = CartSerializer(items, many=True)
        return Response(serializer.data)

class MyOrdersView(APIView):
    def get(self, request):
        email = request.GET.get('email')
        if not email:
            return Response({'error': 'Email required'}, status=400)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=404)

        orders = Order.objects.filter(user=user).order_by('-id')
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)
    
class MyServicesView(APIView):
    def get(self, request):
        email = request.GET.get('email')
        if not email:
            return Response({'error': 'Email required'}, status=400)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=404)

        services = ServiceBooking.objects.filter(user=user).order_by('-preferred_date')
        serializer = ServiceBookingSerializer(services, many=True)
        return Response(serializer.data)