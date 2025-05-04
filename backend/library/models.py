from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    type = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    username = None

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []


class Books(models.Model):
    id = models.AutoField(primary_key=True)
    bookname = models.CharField(max_length=255, unique=True)
    authorname = models.CharField(max_length=255)
    bookdescription = models.CharField(max_length=255)
    bookcategory = models.CharField(max_length=255)
    quantity = models.IntegerField()


class IshueedBooks(models.Model):
    id = models.AutoField(primary_key=True)
    bookname = models.CharField(max_length=255)
    studentname = models.CharField(max_length=255)
    ishueed = models.CharField(max_length=255)
    returnd = models.CharField(max_length=255)


class ReturnedBooks(models.Model):
    id = models.AutoField(primary_key=True)
    bookname = models.CharField(max_length=255)
    studentname = models.CharField(max_length=255)
    ishueed = models.CharField(max_length=255)
