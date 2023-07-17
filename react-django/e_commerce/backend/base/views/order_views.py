from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from django.contrib.auth.models import User # the default user model
from django.contrib.auth.hashers import make_password # hashes passwords

from datetime import datetime

from ..models import Product, Order, OrderItem, ShippingAddress
from ..serializers import OrderSerializer

######################################################################

@api_view(["PUT"])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(req, pk):
    
    order = Order.objects.get(_id=pk)

    order.isDelivered = True
    order.deliveredAt = datetime.now()
    order.save()

    return Response("Order was Delivered")

######################################################################

@api_view(["GET"])
@permission_classes([IsAdminUser])
def adminGetOrders(req):

    orders = Order.objects.all()

    serializer = OrderSerializer(orders, many=True)

    return Response(serializer.data)

######################################################################

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getUserOrders(req):

    user = req.user    
    orders = user.order_set.all()

    serializer = OrderSerializer(orders, many=True)

    return Response(serializer.data)

######################################################################

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(req, pk):
    
    order = Order.objects.get(_id=pk)

    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()

    return Response("Order was paid")

######################################################################

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getOrderById(req, pk):
    user = req.user

    try:
        order = Order.objects.get(_id=pk)

        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        
        else:
            return Response({"detail": "Not authorized to view this order!"}, status=status.HTTP_401_UNAUTHORIZED)

    except:
        return Response({"detail": "Order does not exist."}, status=status.HTTP_400_BAD_REQUEST)

######################################################################

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def addOrderItems(req):
    user = req.user
    data = req.data

    orderItems = data["orderItems"]

    if orderItems and len(orderItems) == 0:
        return Response(
            {"detail": "No order items"}, status=status.HTTP_400_BAD_REQUEST
        )

    else:
        order = Order.objects.create(
            user = user,
            paymentMethod = data["paymentMethod"],
            subtotal = data["subtotal"],
            tax = data["tax"],
            shipping = data["shipping"],
            total = data["total"],
        )

        shipping = ShippingAddress.objects.create(
            order = order,
            address = data["shippingAddress"]["address"],
            city = data["shippingAddress"]["city"],
            postalCode = data["shippingAddress"]["postal_code"],
            country = data["shippingAddress"]["country"],
        )

        for item in orderItems:
            product = Product.objects.get(_id=item["product"])

            orderItem = OrderItem.objects.create(
                product = product,
                order = order,
                name = product.name,
                qty = item["qty"],
                price = item["price"],
                image = product.image.url,
            )

            product.countInStock -= orderItem.qty
            product.save()

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)
