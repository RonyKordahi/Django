from django.urls import path

from .views import getUser

urlpatterns = [
    path("", getUser),
]