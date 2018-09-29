from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone


class User(AbstractUser):
    date_joined = models.DateTimeField(default=timezone.now)

