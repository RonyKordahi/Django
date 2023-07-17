# modifies the username field to match the email provided
# ↪ check "apps.py" for the next part

from django.db.models.signals import pre_save
from django.contrib.auth.models import User

def updateUser(sender, instance, **kwargs):
    
    user = instance

    if user.email != "":
        user.username = user.email

pre_save.connect(updateUser, sender=User)