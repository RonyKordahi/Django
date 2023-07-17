from rest_framework import serializers

from django.contrib.auth.models import User  # the default user model
from .models import Product, Review, Order, OrderItem, ShippingAddress

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

#######################################################################

class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = "__all__"

#######################################################################

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = "__all__"

#######################################################################

class OrderSerializer(serializers.ModelSerializer):

    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = "__all__"


    def get_orderItems(self, obj):

        # https://stackoverflow.com/questions/41000308/django-objects-and-model-set
        # models names get lower cased when the relationship is called inside anotehr model
        items = obj.orderitem_set.all()

        serializer = OrderItemSerializer(items, many=True)
        
        return serializer.data
    
    def get_shippingAddress(self, obj):
        try:
            # original solution from udemy, made no damn sense
            # EDIT: I believe this is a reverse-relation, just like line 40
            # address = ShippingAddressSerializer(obj.shippingaddress, many=False).data
            
            # solution found in lecture questions 
            # https://www.udemy.com/course/django-with-react-an-ecommerce-website/learn/lecture/24599606#questions/15618638
            address = ShippingAddress.objects.get(order=obj)
            serializer = ShippingAddressSerializer(address, many=False)
            
        except:
            address = False

        return serializer.data
    
    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)

        return serializer.data


#######################################################################

#######################
# Customize JWT Token #
#######################


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod

    # can customize what fields are returned in the token
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token["username"] = user.username
        token["first_name"] = user.first_name
        token["last_name"] = user.last_name
        token["email"] = user.email

        return token

    # can customize what fields are returned with the token (side by side)
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        # loops through all the fields to return rather than do it manually
        for key, value in serializer.items():
            data[key] = value

        # setting the fields manually
        # data["username"] = self.user.username
        # data["email"] = self.user.email

        return data

#######################################################################

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"

#######################################################################

class ProductSerializer(serializers.ModelSerializer):

    reviews = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Product
        fields = "__all__"

    def get_reviews(self, obj):
        
        allReviews = obj.review_set.all()
        serializer = ReviewSerializer(allReviews, many=True)

        return serializer.data


#######################################################################

class UserSerializer(serializers.ModelSerializer):
    # links custom field to the method that generates it
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ["_id", "username", "name", "email", "isAdmin"]

    # custom method to return custom field
    # MUST START WITH "get_"
    # structure: get_<field>(self, obj)
    def get_name(self, obj):
        name = obj.first_name + " " + obj.last_name

        if name == "":
            name = obj.email

        return name

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff


#######################################################################


# creates a new token
class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ["_id", "username", "name", "email", "isAdmin", "token"]

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)

        return str(token.access_token)
