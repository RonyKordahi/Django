from django.urls import path

from ..views.order_views import addOrderItems, getOrderById, updateOrderToPaid, getUserOrders, adminGetOrders, updateOrderToDelivered

urlpatterns = [
    path("add/", addOrderItems, name="addOrder"),
    path("myorders/", getUserOrders, name="getUserOrders"),
    path("", adminGetOrders, name="adminGetOrders"),
    path("<str:pk>/", getOrderById, name="getOrderById"),
    path("<str:pk>/pay/", updateOrderToPaid, name="updateOrderToPaid"),
    path("<str:pk>/deliver/", updateOrderToDelivered, name="updateOrderToDelivered"),
]