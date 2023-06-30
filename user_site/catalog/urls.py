from django.urls import path
from .views import index, my_view, BookCreate, BookDetail, SignUpView, CheckedOutBooksByUser

app_name = "catalog"

urlpatterns = [
    path("", index, name="index"),
    path("my_view/", my_view, name="my_view"),
    path("book_create/", BookCreate.as_view(), name="book_create"),
    path("book_detail.<int:pk>/", BookDetail.as_view(), name="book_detail"),
    path("signup/", SignUpView.as_view(), name="signup"),
    path("profile/", CheckedOutBooksByUser.as_view(), name="profile"),
]
