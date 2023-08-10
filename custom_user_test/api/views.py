from django.shortcuts import render

# Create your views here.

from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.conf import settings

from .serializers import CompanySerializer, UserSerializer
from .models import Company, User

@api_view(["GET"])
def getUser(req):
    
    users = User.objects.all()

    serializer = UserSerializer(users, many=True)

    return Response(serializer.data)