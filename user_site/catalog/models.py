from django.db import models
from django.urls import reverse
from django.contrib.auth.models import User #imports user model

import uuid

##########################################################################################################

class Genre(models.Model):
    
    name = models.CharField(max_length=150)

    def __str__(self):
        return self.name

##########################################################################################################

class Language(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

##########################################################################################################

class Book(models.Model):

    title = models.CharField(max_length=200)
    summary = models.TextField(max_length=600)
    isbn = models.CharField("ISBN", max_length=13, unique=True)
    genre = models.ManyToManyField(Genre)

    # connects the key of this model to another model
    language = models.ForeignKey("Language", on_delete=models.SET_NULL, null=True)

    # sets field to null so it doens't cascade and delete everything
    # null=True allows the field to be set to null
    author = models.ForeignKey("Author", on_delete=models.SET_NULL, null=True)

    def __str__(self) -> str:
        return self.title
    
    def get_absolute_url(self):
        return reverse("catalog:book_detail", kwargs={"pk": self.pk})

# solution indirectly found at https://stackoverflow.com/questions/51789192/why-am-i-receiving-this-noreversematch-error
# get_absolute_url dictates the returned string to use as a url
# app name required before view name, not mentioned by udemy course

##########################################################################################################

class Author(models.Model):

    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    date_of_birth = models.DateField(null=True, blank=True)

    class Meta:
        ordering = ["last_name", "first_name"]

    def get_absolute_url(self):
        return reverse("catalog:author_detail", kwargs={"pk": self.pk})
    
    def __str__(self):
        return f"{self.last_name}, {self.first_name}"

##########################################################################################################

class BookInstance(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    imprint = models.CharField(max_length=200)
    due_date = models.DateField(null=True, blank=True)
    LOAN_STATUS = (
        ("m", "Maintenance"),
        ("o", "On Loan"),
        ("a", "Available"),
        ("r", "Reserved")
    )
    status = models.CharField(max_length=1, choices=LOAN_STATUS, blank=True, default="m")

    # prevents from deleting the book before all instances are gone
    book = models.ForeignKey("Book", on_delete=models.RESTRICT)

    borrower = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)

    class Meta:
        ordering = ["due_date"]

    def __str__(self):
        return f"{self.id} ({self.book.title})"