from django.db import models

# Create your models here.
# Ce que tu écris en Python
class Ref(models.Model):
    title = models.CharField(max_length=200)
    url = models.URLField(unique=True)
    category = models.CharField(max_length=100, blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)