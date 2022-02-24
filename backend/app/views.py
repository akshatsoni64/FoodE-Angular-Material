from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.views import Response

from .models import *
from .serializers import *

class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = '__all__'
    queryset = User.objects.all()


class FoodViewSet(ModelViewSet):
    serializer_class = FoodSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = '__all__'
    queryset = Food.objects.all()


class MenuViewSet(ModelViewSet):
    # filter_backends = [DjangoFilterBackend]
    # filterset_fields = '__all__'
    http_method_names = ['get']
    queryset = Food.objects.all()

    def list(self, request, *args, **kwargs):
        user = request.GET.get('user', None)
        if not user:
            return Response("User is required")

        favs = Favourites.objects.filter(user=user).values_list('food__pk', flat=True)
        carts = Cart.objects.filter(user=user).values_list('food__pk', flat=True)

        queryset = FoodSerializer(Food.objects.all(), many=True).data

        for rec in queryset:
            if rec['id'] in carts:
                rec['inCart'] = True
                rec['cartId'] = Cart.objects.get(user=user, food=rec['id']).id
            
            if rec['id'] in favs:
                rec['isFav'] = True
                rec['favId'] = Favourites.objects.get(user=user, food=rec['id']).id
        return Response(queryset)


class CartViewSet(ModelViewSet):
    serializer_class = CartSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = '__all__'
    queryset = Cart.objects.all()


class CartDetailsViewSet(ModelViewSet):
    serializer_class = CartDetailsSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = '__all__'
    queryset = Cart.objects.all()


class OrderViewSet(ModelViewSet):
    serializer_class = OrderSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = '__all__'
    queryset = Order.objects.all()

    def create(self, request, *args, **kwargs):
        Cart.objects.filter(pk__in=request.data['cart']).update(active=False)
        # return super().create(request, *args, **kwargs)


class OrderDetailsViewSet(ModelViewSet):
    serializer_class = OrderDetailsSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = '__all__'
    queryset = Order.objects.all()


class FavouritesViewSet(ModelViewSet):
    serializer_class = FavouritesSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = '__all__'
    queryset = Favourites.objects.all()


class FavouritesDetailsViewSet(ModelViewSet):
    serializer_class = FavouritesDetailsSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = '__all__'
    queryset = Favourites.objects.all()