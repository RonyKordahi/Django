from django.db import models

# Create your models here.

class Album(models.Model):

    name = models.CharField(max_length=120)

    def __str__(self):
        return self.name


class Song(models.Model):

    name = models.CharField(max_length=120)
    album = models.ForeignKey(Album, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Artist(models.Model):

    name = models.CharField(max_length=120)

    # prevents the instance from being deleted by parent's cascade
    song = models.ForeignKey(Song, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name