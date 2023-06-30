from typing import Any
from django.db.models.query import QuerySet
from django.shortcuts import render
from django.urls import reverse_lazy
from django.views.generic import CreateView, DetailView, ListView
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin

# UserCreationForm is a ModelForm, not a view
from django.contrib.auth.forms import UserCreationForm

from .models import Book, Author, BookInstance, Genre, Language

##########################################################################################################

def index(req):
    
    num_books = Book.objects.all().count()
    num_instances = BookInstance.objects.all().count()
    num_avail = BookInstance.objects.filter(status__exact="a").count()

    context = {"num_books": num_books, "num_avail": num_avail, "num_instances": num_instances}

    return render(req, "catalog/index.html", context=context)

##########################################################################################################

# mixin that ensures only logged in users can access this view
class BookCreate(LoginRequiredMixin, CreateView):
    model = Book

    fields = "__all__"

##########################################################################################################

class BookDetail(DetailView):
    model = Book

##########################################################################################################

# decorator that ensures only logged in users can access this view
@login_required
def my_view(req):
    return render(req, "catalog/my_view.html")

##########################################################################################################

class SignUpView(CreateView):

    # connects the form to the view
    form_class = UserCreationForm

    # redirect on success
    success_url = reverse_lazy("login")

    # overwrites default CreateView template association
    template_name = "catalog/signup.html"

##########################################################################################################

class CheckedOutBooksByUser(LoginRequiredMixin, ListView):
    model = BookInstance
    template_name = "catalog/profile.html"
    
    # auto creates pages by X number of instances found
    paginate_by = 5

    # overwrites default query model.objects.all() - DYNAMIC
    # https://stackoverflow.com/questions/19707237/use-get-queryset-method-or-set-queryset-variable
    def get_queryset(self):
        return BookInstance.objects.filter(borrower=self.request.user).all()