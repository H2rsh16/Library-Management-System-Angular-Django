from django.shortcuts import render
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import *
from library.serializers import *
import jwt, datetime


# Create your views here.
class RegisterUserView(APIView):
    def post(self, request):
        user = UserSerializer(data=request.data)
        user.is_valid(raise_exception=True)
        user.save()
        return Response(user.data)


class RegisterBookView(APIView):
    def post(self, request):
        book = BookSerializer(data=request.data)
        book.is_valid(raise_exception=True)
        book.save()
        return Response(book.data)


class ShowBookView(APIView):
    def get(self, request):
        query = Books.objects.all()
        serializer = BookSerializer(query, many=True, read_only=True)
        return Response(serializer.data)


class ShowStudentsView(APIView):
    def get(self, request):
        query = User.objects.filter(type="Student")
        serializer = UserSerializer(query, many=True, read_only=True)
        return Response(serializer.data)


class ShowIshueedBookView(APIView):
    def get(self, request):
        query = IshueedBooks.objects.all()
        serializer = IshueedBookSerializer(query, many=True, read_only=True)
        return Response(serializer.data)


class ShowIshueedOfOne(APIView):
    def get(self, request, studentname):
        query = IshueedBooks.objects.filter(studentname=studentname)
        serializer = IshueedBookSerializer(query, many=True, read_only=True)
        return Response(serializer.data)


class ShowReturnedBooks(APIView):
    def get(self, request):
        query = ReturnedBooks.objects.all()
        serializer = ReturnedBookSerializer(query, many=True, read_only=True)
        return Response(serializer.data)


class RemoveBook(APIView):
    def delete(self, request, bookname, authorname):
        bname = Books.objects.get(bookname=bookname, authorname=authorname)
        bname.delete()
        return Response("Book Deleted Successfully")


class RemoveAllBooks(APIView):
    def delete(self, request):
        bname = Books.objects.all()
        bname.delete()
        return Response("Book Deleted Successfully")


class CheckBookforIshuee(APIView):
    def get(self, request, bookname, authorname):
        bookdata = Books.objects.get(bookname=bookname, authorname=authorname)
        serializer = BookSerializer(bookdata)
        return Response(serializer.data)


class CheckBookforReturn(APIView):
    def get(self, request, bookname, studentname):
        bookdata = IshueedBooks.objects.filter(
            bookname=bookname, studentname=studentname
        ).first()
        serializer = IshueedBookSerializer(bookdata)
        return Response(serializer.data)


class CheckBookCount(APIView):
    def get(self, request):
        aBook = Books.objects.all().count()
        return Response(aBook)


class CheckStudentCount(APIView):
    def get(self, request):
        aStudent = User.objects.filter(type="Student").count()
        return Response(aStudent)


class CheckIshueedBookCount(APIView):
    def get(self, request):
        aIshueedBook = IshueedBooks.objects.all().count()
        return Response(aIshueedBook)


class CheckReturnedBookCount(APIView):
    def get(self, request):
        aReturnedBook = ReturnedBooks.objects.all().count()
        return Response(aReturnedBook)


class IshueeABook(APIView):
    def post(self, request):
        bookdata = IshueedBookSerializer(data=request.data)
        bookdata.is_valid(raise_exception=True)
        bookdata.save()
        return Response(bookdata.data)


class UpdatePassword(APIView):
    def get(self, request, name, email):
        user = User.objects.get(name=name, email=email)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def patch(self, request, name, email):
        user = User.objects.get(name=name, email=email)
        serializer = UserSerializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)


class UpdateQuantity(APIView):
    def get(self, request, bookname, authorname):
        book = Books.objects.filter(bookname=bookname, authorname=authorname).first()
        serializer = BookSerializer(book)
        return Response(serializer.data["quantity"])

    def patch(self, request, bookname, authorname):
        book = Books.objects.get(bookname=bookname, authorname=authorname)
        serializer = BookSerializer(book, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)


class ReturnIshuuedBook(APIView):
    def delete(self, request, bookname, ishueed):
        Book = IshueedBooks.objects.filter(bookname=bookname, ishueed=ishueed).first()
        Book.delete()
        return Response("Book Returned Successfully")


class SaveReturnedBook(APIView):
    def post(self, request):
        returnedbooks = ReturnedBookSerializer(data=request.data)

        returnedbooks.is_valid(raise_exception=True)
        returnedbooks.save()
        return Response("Returned")


class LoginUserView(APIView):
    def post(self, request):
        email = request.data["email"]
        password = request.data["password"]

        user = User.objects.filter(email=email).first()

        if user is None:
            return Response("Data is invalid")
        
        if not user.check_password(password):
            return Response('Incorrect Password')

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


class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get("jwt")

        if not token:
            raise AuthenticationFailed("Unauthenticated")

        try:
            payload = jwt.decode(token, "secret", algorithms=["HS256"])

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Unauthenticated")

        user = User.objects.filter(id=payload["id"]).first()
        serializer = UserSerializer(user)

        return Response(serializer.data)


class LogOutUserView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie("jwt")
        response.data = {"Msg": "Logout Success"}

        return response
