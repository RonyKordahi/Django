from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class Company(models.Model):

    name = models.CharField(max_length=120)

    def __str__(self):
        return self.name
    
#####################################################

class User(AbstractUser):

    name = models.CharField(max_length=120)

    # works with no problems
    company = models.ForeignKey(Company, on_delete=models.SET_NULL, null=True)