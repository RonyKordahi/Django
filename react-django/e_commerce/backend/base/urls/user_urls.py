from django.urls import path

# import tokens
from rest_framework_simplejwt.views import TokenObtainPairView

# udemy import
# from base.views import user_views as views

from ..views.user_views import getUser, getUsers, registerUser, updateUser, deleteUser, adminGetUser, adminUpdateUser

urlpatterns = [
    path("", getUsers, name="getUsers"),

    path("profile/", getUser, name="getUser"),
    path("profile/update/", updateUser, name="updateUser"),

    path("register/", registerUser, name="registerUser"),
    path("delete/<str:pk>/", deleteUser, name="deleteUser"),
    
    # url for token authentication
    # the "/" is required at the end of the fetch (probably because of the API)
    path("login/", TokenObtainPairView.as_view(), name="login"), 

    path("<str:pk>/", adminGetUser, name="adminGetUser"),
    path("update/<str:pk>/", adminUpdateUser, name="adminUpdateUser"),
]