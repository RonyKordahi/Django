from django.contrib import admin
from cars.models import Car

# Register your models here.

# admin.site.register(Car)

class CarAdmin(admin.ModelAdmin):

    # changes the order of the fields
    # fields = ["year", "brand"]

    # sections the fields
    fieldsets = [
        ("Time Information", {"fields": ["year"]}),
        ("Car Information", {"fields": ["brand"]})
    ]
    

admin.site.register(Car, CarAdmin)