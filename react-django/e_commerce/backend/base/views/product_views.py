from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from ..models import Product, Review
from ..serializers import ProductSerializer

#######################################################################

###################
# Create a review #
###################

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def createReview(req, pk):
    
    user = req.user
    data = req.data
    
    product = Product.objects.get(_id=pk)
    
    # review already exists
    alreadyExists = product.review_set.filter(user=user).exists()

    if alreadyExists:
        return Response({"detail": "Product already reviewed."}, status=status.HTTP_400_BAD_REQUEST)

    # review with no rating
    elif data["rating"] == 0:
        return Response({"detail": "Please provide a rating!"}, status=status.HTTP_400_BAD_REQUEST)

    # no problems, create review
    else:
        review = Review.objects.create(
            product = product,
            user = user,
            name = user.first_name + " " + user.last_name,
            review = data["review"],
            rating = data["rating"],
        )

        reviews = Review.objects.all()
        product.numReviews = len(reviews)

        total = 0
        for rev in reviews:
            total += rev.rating

        product.rating = total / len(reviews)
        product.save()

    return Response("Review created")

#######################################################################

###################
# Upload an Image #
###################

@api_view(["POST"])
def uploadImage(req, pk):
    
    data = req.data
    
    product = Product.objects.get(_id=pk)
    product.image = req.FILES.get("image")
    product.save()

    return Response("Image was uploaded")

#######################################################################

###########################
# ADMIN: Update a product #
###########################

@api_view(["PUT"])
@permission_classes([IsAdminUser])
def adminUpdateProduct(req, pk):

    data = req.data

    product = Product.objects.get(_id=pk)

    product.name = data["name"]
    product.price = data["price"]
    product.brand = data["brand"]
    product.countInStock = data["countInStock"]
    product.category = data["category"]
    product.description = data["description"]

    product.save()

    serializer = ProductSerializer(product, many=False)

    return Response(serializer.data)

#######################################################################

###########################
# ADMIN: Create a product #
###########################

@api_view(["POST"])
@permission_classes([IsAdminUser])
def adminCreateProduct(req):

    user = req.user

    product = Product.objects.create(
        user = user,
        name = "Sample Name",
        price = 100,
        brand = "Sample Brand",
        countInStock = 10,
        category = "Whatever",
        description = "Lorem Imsum Dolem",
    )

    serializer = ProductSerializer(product, many=False)

    return Response(serializer.data)


#######################################################################

###########################
# ADMIN: Delete a product #
###########################

@api_view(["DELETE"])
@permission_classes([IsAdminUser])
def adminDeleteProduct(req, pk):

    product = Product.objects.get(_id=pk)
    product.delete()

    return Response("Product Deleted")

#######################################################################

@api_view(["GET"])
def getTopProducts(req):

    # -rating inverses it so it's in descending order
    products = Product.objects.filter(rating__gte=4).order_by("-rating")[0:5]
    serialzer = ProductSerializer(products, many=True)

    return Response(serialzer.data)

#######################################################################

####################
# Get all products #
####################

@api_view(["GET"])
def getProducts(req):

    # grab specific query
    query = req.query_params.get("query")
    page = req.query_params.get("page")

    if query == None:
        query = ""

    products = Product.objects.filter(name__icontains=query)

    paginator = Paginator(products, 4)

    try:
        products = paginator.page(page)

    except PageNotAnInteger:
        products = paginator.page(1)

    except:
        products = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)

    serializer = ProductSerializer(products, many=True)
    return Response({"products": serializer.data, "page": page, "pages": paginator.num_pages})

#######################################################################

#################
# Get a product #
#################

@api_view(["GET"])
def getProduct(req, pk):

    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)

    return Response(serializer.data)

#######################################################################

# NOTES:
# 
# @api_view() - required decorator to make the view work with rest_framework's "Response"
# the decorator requires a list of supported methods to generates
# 
# many=True - tells the serializer to convert many results to JSON
#
# <field>__icontains - searches in the specified field if it contains specified value
# ↪ the "i" before "contains" means case insensitive
#
# <field>__gte - searches in the specified fields if value is >= specified value