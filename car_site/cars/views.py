from django.shortcuts import render, redirect
from django.urls import reverse
from . import models

# Create your views here.

#################
# List all Cars #
#################
def list(req):
    cars = models.Car.objects.all()

    return render(req, "list.html", context={"cars": cars})

#############
# Add a Car #
#############
def add(req):

    if req.POST:
        brand = req.POST["brand"]
        year = int(req.POST["year"])

        # create new Car entry
        models.Car.objects.create(brand=brand, year=year)

        # redirect the user to the list url
        return redirect(reverse("cars:list"))

    return render(req, "add.html")

################
# Delete a Car #
################
def delete(req):
        
    if req.POST:
        pk = req.POST["pk"]

        try:
            # delete car and redirect to list
            models.Car.objects.get(pk=pk).delete()
            return redirect(reverse("cars:list"))
        
        except:
            print("pk not found!")
            return redirect(reverse("cars:list"))
    
    return render(req, "delete.html")