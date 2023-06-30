from django.db import models

# Create your models here.

class Car(models.Model):

    brand = models.CharField(max_length=30)
    year = models.IntegerField()

    def __str__(self):
        # PK is not their position in the DB. It's their ID assigned at creation.
        return f"Car is a {self.brand} {self.year}. PK is {self.pk}"