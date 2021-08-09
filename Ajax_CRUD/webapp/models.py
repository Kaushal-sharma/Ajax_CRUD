from django.db import models
from django.utils import timezone


class User(models.Model):
    name = models.CharField(max_length=70)
    email = models.EmailField(max_length=100)
    #createdate = models.DateTimeField(auto_now_add=True)
    createdatetime = models.CharField(max_length=50, null=True, editable=False)
    

