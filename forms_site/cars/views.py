from django.shortcuts import render, redirect
from django.urls import reverse
from .forms import ReviewForm

# Create your views here.

def rental(req):

    if req.method == "POST":
        form = ReviewForm(req.POST)
        
        if form.is_valid():
            
            # only works if the form is a ModelForm
            form.save()
            
            return redirect(reverse("cars:thank_you"))

    else:
        form = ReviewForm()

    return render(req, "review.html", context={"form": form})

def thank_you(req):
    return render(req, "thank_you.html")