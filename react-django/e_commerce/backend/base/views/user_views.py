from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth.models import User # the default user model
from django.contrib.auth.hashers import make_password # hashes passwords

from ..serializers import UserSerializer, UserSerializerWithToken

#######################################################################

#########################
# ADMING: Update a user #
#########################

@api_view(["PUT"])
@permission_classes([IsAdminUser])
def adminUpdateUser(req, pk):

    user = User.objects.get(id=pk)

    data = req.data

    user.first_name = data["first_name"]
    user.last_name = data["last_name"]
    user.email = data["email"]
    user.is_staff = data["staff"]

    user.save()

    # moved to bottom to return the user AFTER modifications
    serializer = UserSerializerWithToken(user, many=False)

    return Response(serializer.data)

#######################################################################

###########################
# ADMIN: Get a user by ID #
###########################

@api_view(["GET"])
@permission_classes([IsAdminUser])
def adminGetUser(req, pk):

    user = User.objects.get(id=pk)

    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)

#######################################################################

#################
# Delete a user #
#################

@api_view(["DELETE"])
@permission_classes([IsAdminUser])
def deleteUser(req, pk):

    userToDelete = User.objects.get(id=pk)
    userToDelete.delete()

    return Response("User was deleted")

#######################################################################

#################
# Update a user #
#################

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateUser(req):

    user = req.user

    serializer = UserSerializerWithToken(user, many=False)

    data = req.data

    user.first_name = data["first_name"]
    user.last_name = data["last_name"]
    user.email = data["email"]

    if data["password"] != "":
        user.password = make_password(data["password"])

    user.save()

    return Response(serializer.data)

#######################################################################

##############
# Get a user #
##############

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getUser(req):

    user = req.user

    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)

#######################################################################

#################
# Get all users #
#################

@api_view(["GET"])
@permission_classes([IsAdminUser])
def getUsers(req):

    users = User.objects.all()

    serializer = UserSerializer(users, many=True)

    return Response(serializer.data)

#######################################################################

#################
# Create a user #
#################

@api_view(["POST"])
def registerUser(req):

    data = req.data

    print(data)

    try:
        user = User.objects.create(
            first_name = data["first_name"],
            last_name = data["last_name"],
            username = data["email"],
            email = data["email"],
            password = make_password(data["password"]),
        )

        serializer = UserSerializerWithToken(user, many=False)

    except:
        message = {"detail": "A user with this email already exists!"}

        return Response(message, status=status.HTTP_400_BAD_REQUEST)

    return Response(serializer.data)

#######################################################################

# NOTES:
# 
# @permission_classes() - decorator to set access permissions on a view
# the decorator requires a list of supported permissions to grant / restrict access
# 
# IsAuthenticated - permission that checks if a user is authenticated
# ↪ authentication set to django_restframework_simgplejwt in settings.py
# ↪ fetch request required "Authorization" key with auth token value in headers
# 
# IsAdminUser - permission that checks if a user is staff or not