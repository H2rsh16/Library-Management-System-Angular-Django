from rest_framework import serializers
from library.models import *

class UserSerializer(serializers.ModelSerializer):
    # Adding validation for the email field to ensure it's unique and valid
    email = serializers.EmailField(required=True, allow_blank=False)
    
    class Meta:
        model = User
        fields = ["id", "name", "email", "password", "type"]

    def create(self, validated_data):
        # Handle password separately, ensure it gets hashed
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        
        # Set password only if provided and hash it before saving
        if password is not None:
            instance.set_password(password)
        
        # Save the instance
        instance.save()
        return instance

    def validate_email(self, value):
        """
        Custom email validation to ensure uniqueness
        """
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email is already taken.")
        return value


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
