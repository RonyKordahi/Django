from django.urls import path

# imports all views
from . import views 

# name & type are always this
urlpatterns = [
    path("", views.simple_view)
]

# STATIC PATH EXAMPLE
# path("sports/", views.sports_view),

# DYNAMIC PATH EXAMPLE
# path("<topic>/", views.news_view, name="topic-page"),
# path("<int:num_page>", views.num_page_view)