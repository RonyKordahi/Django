from django.urls import path

from ..views.product_views import getProducts, getProduct, adminDeleteProduct, adminCreateProduct, adminUpdateProduct, uploadImage, createReview, getTopProducts

urlpatterns = [
    path("", getProducts, name="getProducts"),
    path("create/", adminCreateProduct, name="adminCreateProduct"),
    path("upload/<str:pk>/", uploadImage, name="uploadImage"),
    
    path("review/<str:pk>/", createReview, name="createReview"),
    path("top/", getTopProducts, name="getTopProducts"),

    path("delete/<str:pk>/", adminDeleteProduct, name="adminDeleteProduct"),
    path("update/<str:pk>/", adminUpdateProduct, name="adminUpdateProduct"),

    path("<str:pk>/", getProduct, name="getProduct"),
]
