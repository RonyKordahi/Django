from django.urls import path
from . import views

# for the url django tag
app_name = "cars"

urlpatterns = [
    path("review/", views.rental, name="rental"),
    path("thank_you", views.thank_you, name="thank_you")
]