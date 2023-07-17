"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

# imports the settings.py
from django.conf import settings

# allows url to handle static files
from django.conf.urls.static import static

# will be used to render React's build
from django.views.generic import TemplateView

urlpatterns = [
    # path that renders React's build
    path("", TemplateView.as_view(template_name="index.html")),
    
    path('admin/', admin.site.urls),
    path("api/products/", include("base.urls.product_urls")),
    path("api/users/", include("base.urls.user_urls")),
    path("api/orders/", include("base.urls.order_urls")),
]

# MUST be added this way to the urlpatterns
# allows a url to be created from the static images folder
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# changes static folder management for deployment
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)