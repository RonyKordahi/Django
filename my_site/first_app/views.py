from django.shortcuts import render
from django.http.response import HttpResponse, HttpResponseNotFound, Http404, HttpResponseRedirect
from django.urls import reverse

# Create your views here.

def simple_view(req):
    return render(req, "first_app/example.html")

# ---------------------------------------------------------------

# STATIC VIEW EXAMPLE
# def finance_view(request):
#     return HttpResponse(articles["finance"])

# DYNAMIC VIEW EXAMPLE
# articles = {
#     "sports": "Sports Page",
#     "finance": "Finance Page",
#     "politics": "Politics Page"
# }

# def news_view(request, topic):

#     try:
#         return HttpResponse(articles[topic])
    
#     except:
#         # generic 404 page
#         raise Http404("404 not found") 

# REVERSE EXAMPLE
# def num_page_view(req, num_page):

#     topics_list = list(articles.keys())
#     topic = topics_list[num_page]

#     webpage = reverse("topic-page", args=[topic])

#     return HttpResponseRedirect(webpage)