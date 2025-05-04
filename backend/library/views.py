from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer, BookSerializer, IshueedBookSerializer, ReturnedBookSerializer
from .models import User, Books, IshueedBooks, ReturnedBooks
import jwt, datetime

# Register User
class RegisterUserView(APIView):
    def post(self, request):
        user = UserSerializer(data=request.data)
        if user.is_valid():
            user.save()
            return Response(user.data, status=status.HTTP_201_CREATED)
        return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)


# Register Book
class RegisterBookView(APIView):
    def post(self, request):
        book = BookSerializer(data=request.data)
        if book.is_valid():
            book.save()
            return Response(book.data, status=status.HTTP_201_CREATED)
        return Response(book.errors, status=status.HTTP_400_BAD_REQUEST)


# Show All Books
class ShowBookView(APIView):
    def get(self, request):
        query = Books.objects.all()
        serializer = BookSerializer(query, many=True)
        return Response(serializer.data)


# Show All Students
class ShowStudentsView(APIView):
    def get(self, request):
        query = User.objects.filter(type="Student")
        serializer = UserSerializer(query, many=True)
        return Response(serializer.data)


# Show Issued Books
class ShowIshueedBookView(APIView):
    def get(self, request):
        query = IshueedBooks.objects.all()
        serializer = IshueedBookSerializer(query, many=True)
        return Response(serializer.data)


# Show Issued Books of One Student
class ShowIshueedOfOne(APIView):
    def get(self, request, studentname):
        query = IshueedBooks.objects.filter(studentname=studentname)
        serializer = IshueedBookSerializer(query, many=True)
        return Response(serializer.data)


# Show Returned Books
class ShowReturnedBooks(APIView):
    def get(self, request):
        query = ReturnedBooks.objects.all()
        serializer = ReturnedBookSerializer(query, many=True)
        return Response(serializer.data)


# Remove Specific Book
class RemoveBook(APIView):
    def delete(self, request, bookname, authorname):
        try:
            bname = Books.objects.get(bookname=bookname, authorname=authorname)
            bname.delete()
            return Response("Book Deleted Successfully")
        except Books.DoesNotExist:
            return Response("Book not found", status=status.HTTP_404_NOT_FOUND)


# Remove All Books
class RemoveAllBooks(APIView):
    def delete(self, request):
        Books.objects.all().delete()
        return Response("All Books Deleted Successfully")


# Check Book for Issuance
class CheckBookforIshuee(APIView):
    def get(self, request, bookname, authorname):
        try:
            bookdata = Books.objects.get(bookname=bookname, authorname=authorname)
            serializer = BookSerializer(bookdata)
            return Response(serializer.data)
        except Books.DoesNotExist:
            return Response("Book not found", status=status.HTTP_404_NOT_FOUND)


# Check Book for Return
class CheckBookforReturn(APIView):
    def get(self, request, bookname, studentname):
        bookdata = IshueedBooks.objects.filter(bookname=bookname, studentname=studentname).first()
        if bookdata:
            serializer = IshueedBookSerializer(bookdata)
            return Response(serializer.data)
        return Response("Book not found or not issued to this student", status=status.HTTP_404_NOT_FOUND)


# Check Book Count
class CheckBookCount(APIView):
    def get(self, request):
        aBook = Books.objects.all().count()
        return Response(aBook)


# Check Student Count
class CheckStudentCount(APIView):
    def get(self, request):
        aStudent = User.objects.filter(type="Student").count()
        return Response(aStudent)


# Check Issued Book Count
class CheckIshueedBookCount(APIView):
    def get(self, request):
        aIshueedBook = IshueedBooks.objects.all().count()
        return Response(aIshueedBook)


# Check Returned Book Count
class CheckReturnedBookCount(APIView):
    def get(self, request):
        aReturnedBook = ReturnedBooks.objects.all().count()
        return Response(aReturnedBook)


# Issue A Book
class IshueeABook(APIView):
    def post(self, request):
        bookdata = IshueedBookSerializer(data=request.data)
        if bookdata.is_valid():
            bookdata.save()
            return Response(bookdata.data, status=status.HTTP_201_CREATED)
        return Response(bookdata.errors, status=status.HTTP_400_BAD_REQUEST)


# Update User Password
class UpdatePassword(APIView):
    def get(self, request, name, email):
        try:
            user = User.objects.get(name=name, email=email)
            serializer = UserSerializer(user)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    def patch(self, request, name, email):
        try:
            user = User.objects.get(name=name, email=email)
            serializer = UserSerializer(user, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)


# Update Book Quantity
class UpdateQuantity(APIView):
    def get(self, request, bookname, authorname):
        try:
            book = Books.objects.filter(bookname=bookname, authorname=authorname).first()
            if book:
                serializer = BookSerializer(book)
                return Response(serializer.data["quantity"])
            return Response("Book not found", status=status.HTTP_404_NOT_FOUND)
        except Books.DoesNotExist:
            return Response("Book not found", status=status.HTTP_404_NOT_FOUND)

    def patch(self, request, bookname, authorname):
        try:
            book = Books.objects.get(bookname=bookname, authorname=authorname)
            serializer = BookSerializer(book, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Books.DoesNotExist:
            return Response("Book not found", status=status.HTTP_404_NOT_FOUND)


# Return Issued Book
class ReturnIshuuedBook(APIView):
    def delete(self, request, bookname, ishueed):
        book = IshueedBooks.objects.filter(bookname=bookname, ishueed=ishueed).first()
        if book:
            book.delete()
            return Response("Book Returned Successfully")
        return Response("Book not found", status=status.HTTP_404_NOT_FOUND)


# Save Returned Book
class SaveReturnedBook(APIView):
    def post(self, request):
        returnedbooks = ReturnedBookSerializer(data=request.data)

        if returnedbooks.is_valid():
            returnedbooks.save()
            return Response("Returned", status=status.HTTP_201_CREATED)
        return Response(returnedbooks.errors, status=status.HTTP_400_BAD_REQUEST)


# Login User
class LoginUserView(APIView):
    def post(self, request):
        email = request.data["email"]
        password = request.data["password"]

        user = User.objects.filter(email=email).first()

        if user is None:
            return Response("Data is invalid", status=status.HTTP_400_BAD_REQUEST)

        if not user.check_password(password):
            return Response('Incorrect Password', status=status.HTTP_400_BAD_REQUEST)

        payload = {
            "id": user.id,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            "iat": datetime.datetime.utcnow(),
        }

        token = jwt.encode(payload, "secret", algorithm="HS256")

        response = Response()
        response.set_cookie(key="jwt", value=token, httponly=True)
        response.data = {"jwt": token}

        return response


# Get User Info (Authenticated)
class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get("jwt")

        if not token:
            raise AuthenticationFailed("Unauthenticated", code=401)

        try:
            payload = jwt.decode(token, "secret", algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Token expired", code=401)
        except jwt.InvalidTokenError:
            raise AuthenticationFailed("Invalid token", code=401)

        user = User.objects.filter(id=payload["id"]).first()
        if user is None:
            raise AuthenticationFailed("User not found", code=401)

        serializer = UserSerializer(user)
        return Response(serializer.data)


# Log Out User
class LogOutUserView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie("jwt")
        response.data = {"Msg": "Logout Success"}

        return response
