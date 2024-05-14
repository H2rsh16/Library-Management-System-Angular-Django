from rest_framework import serializers
from library.models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "name", "email", "password", "type"]

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Books
        fields = [
            "id",
            "bookname",
            "authorname",
            "bookdescription",
            "bookcategory",
            "quantity",
        ]


class IshueedBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = IshueedBooks
        fields = ["id", "bookname", "studentname", "ishueed", "returnd"]


class ReturnedBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReturnedBooks
        fields = ["id", "bookname", "studentname", "ishueed"]
