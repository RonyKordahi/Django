from django.urls import path
from . import views

urlpatterns = [
    path("", views.view_patients, name = "view_patients")
]