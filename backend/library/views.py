import os
import jwt
import datetime
from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import status
from library.serializers import *
from library.models import *

def get_authenticated_user(request):
    token = request.COOKIES.get("jwt")
    if not token:
        raise AuthenticationFailed("Unauthenticated")
    try:
        payload = jwt.decode(token, "secret", algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed("Token expired")
    except jwt.InvalidTokenError:
        raise AuthenticationFailed("Invalid token")
    return get_object_or_404(User, id=payload["id"])

class RegisterUserView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class RegisterBookView(APIView):
    def post(self, request):
        serializer = BookSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class ShowBookView(APIView):
    def get(self, request):
        books = Books.objects.all()
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)

class ShowStudentsView(APIView):
    def get(self, request):
        students = User.objects.filter(type="Student")
        serializer = UserSerializer(students, many=True)
        return Response(serializer.data)

class ShowIssuedBookView(APIView):
    def get(self, request):
        issued_books = IssuedBooks.objects.all()
        serializer = IssuedBookSerializer(issued_books, many=True)
        return Response(serializer.data)

class ShowIssuedOfOne(APIView):
    def get(self, request, studentname):
        issued_books = IssuedBooks.objects.filter(studentname=studentname)
        serializer = IssuedBookSerializer(issued_books, many=True)
        return Response(serializer.data)

class ShowReturnedBooks(APIView):
    def get(self, request):
        returned_books = ReturnedBooks.objects.all()
        serializer = ReturnedBookSerializer(returned_books, many=True)
        return Response(serializer.data)

class RemoveBook(APIView):
    def delete(self, request, bookname, authorname):
        book = get_object_or_404(Books, bookname=bookname, authorname=authorname)
        book.delete()
        return Response({"message": "Book Deleted Successfully"}, status=status.HTTP_204_NO_CONTENT)

class RemoveAllBooks(APIView):
    def delete(self, request):
        Books.objects.all().delete()
        return Response({"message": "All Books Deleted Successfully"}, status=status.HTTP_204_NO_CONTENT)

class CheckBookForIssue(APIView):
    def get(self, request, bookname, authorname):
        book = get_object_or_404(Books, bookname=bookname, authorname=authorname)
        serializer = BookSerializer(book)
        return Response(serializer.data)

class CheckBookForReturn(APIView):
    def get(self, request, bookname, studentname):
        book = IssuedBooks.objects.filter(bookname=bookname, studentname=studentname).first()
        if not book:
            return Response({"error": "No such book issued"}, status=status.HTTP_404_NOT_FOUND)
        serializer = IssuedBookSerializer(book)
        return Response(serializer.data)

class CheckBookCount(APIView):
    def get(self, request):
        count = Books.objects.count()
        return Response({"book_count": count})

class CheckStudentCount(APIView):
    def get(self, request):
        count = User.objects.filter(type="Student").count()
        return Response({"student_count": count})

class CheckIssuedBookCount(APIView):
    def get(self, request):
        count = IssuedBooks.objects.count()
        return Response({"issued_book_count": count})

class CheckReturnedBookCount(APIView):
    def get(self, request):
        count = ReturnedBooks.objects.count()
        return Response({"returned_book_count": count})

class IssueABook(APIView):
    def post(self, request):
        serializer = IssuedBookSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class ReturnIssuedBook(APIView):
    def delete(self, request, bookname, ishueed):
        book = IssuedBooks.objects.filter(bookname=bookname, ishueed=ishueed).first()
        if not book:
            return Response({"error": "Issued book not found"}, status=status.HTTP_404_NOT_FOUND)
        book.delete()
        return Response({"message": "Book Returned Successfully"}, status=status.HTTP_204_NO_CONTENT)

class SaveReturnedBook(APIView):
    def post(self, request):
        serializer = ReturnedBookSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "Book marked as returned"}, status=status.HTTP_201_CREATED)

class UpdatePassword(APIView):
    def get(self, request, name, email):
        user = get_object_or_404(User, name=name, email=email)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def patch(self, request, name, email):
        user = get_object_or_404(User, name=name, email=email)
        serializer = UserSerializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class UpdateQuantity(APIView):
    def get(self, request, bookname, authorname):
        book = get_object_or_404(Books, bookname=bookname, authorname=authorname)
        return Response({"quantity": book.quantity})

    def patch(self, request, bookname, authorname):
        book = get_object_or_404(Books, bookname=bookname, authorname=authorname)
        serializer = BookSerializer(book, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class LoginUserView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response({"error": "Email and password are required"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.filter(email=email).first()
        if user is None or not user.check_password(password):
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        payload = {
            "id": user.id,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            "iat": datetime.datetime.utcnow(),
        }

        token = jwt.encode(payload, "secret", algorithm="HS256")

        response = Response({"jwt": token})
        response.set_cookie(
            key="jwt",
            value=token,
            httponly=True,
            secure=True,
            samesite="Lax",
        )
        return response

class UserView(APIView):
    def get(self, request):
        user = get_authenticated_user(request)
        serializer = UserSerializer(user)
        return Response(serializer.data)

class LogoutUserView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie("jwt")
        response.data = {"message": "Logout successful"}
        return response
