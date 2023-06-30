from django.urls import path
from . import views

# used for django url tag
app_name = "classroom"

urlpatterns = [
    path("", views.HomeView.as_view(), name="home"),
    path("thanks/", views.ThankYouView.as_view(), name="thanks"),
    path("contact/", views.ContactFormView.as_view(), name="contact"),
    path("create_teacher/", views.TeacherCreateView.as_view(), name="create_teacher"),
    path("list_teacher/", views.ListTeacherView.as_view(), name="list_teacher"),
    path("detail_teacher/<int:pk>", views.DetailTeacherView.as_view(), name="detail_teacher"),
    path("update_teacher/<int:pk>", views.UpdateTeacherView.as_view(), name="update_teacher"),
    path("delete_teacher/<int:pk>", views.DeleteTeacherView.as_view(), name="delete_teacher"),
]
