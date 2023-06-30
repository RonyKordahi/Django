from django.db import models

# Create your models here.

class Teacher(models.Model):
    fname = models.CharField(max_length=30)
    lname = models.CharField(max_length=30)
    subject = models.CharField(max_length=30)

    def __str__(self):
        return f"{self.fname} {self.lname} teaches {self.subject}"