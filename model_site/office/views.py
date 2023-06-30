from django.shortcuts import render
from django.http.response import HttpResponse

from . import models

# Create your views here.

def view_patients(req):

    # query all patients
    patients = models.Patient.objects.all()

    return render(req, "patients.html", context = {"patients": patients})