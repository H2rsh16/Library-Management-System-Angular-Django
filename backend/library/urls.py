from django.urls import path, include
from library.views import *

urlpatterns = [
    path("register", RegisterUserView.as_view()),
    path("forgotpassword/<str:name>,<str:email>", UpdatePassword.as_view()),
    path("addbook", RegisterBookView.as_view()),
    path("showbook", ShowBookView.as_view()),
    path("showstudents", ShowStudentsView.as_view()),
    path("showishueedbook", ShowIshueedBookView.as_view()),
    path("showreturnedbook", ShowReturnedBooks.as_view()),
    path("showishueedofone/<str:studentname>", ShowIshueedOfOne.as_view()),
    path("changequantity/<str:bookname>,<str:authorname>", UpdateQuantity.as_view()),
    path("removebook/<str:bookname>,<str:authorname>", RemoveBook.as_view()),
    path("removeallbooks", RemoveAllBooks.as_view()),
    path("ishueebook", IshueeABook.as_view()),
    path(
        "checkishueebook/<str:bookname>,<str:authorname>", CheckBookforIshuee.as_view()
    ),
    path(
        "checkreturnbook/<str:bookname>,<str:studentname>", CheckBookforReturn.as_view()
    ),
    path("bookscount", CheckBookCount.as_view()),
    path("studentscount", CheckStudentCount.as_view()),
    path("ishueedbookscount", CheckIshueedBookCount.as_view()),
    path("returnedbookscount", CheckReturnedBookCount.as_view()),
    path("returnishueedbook/<str:bookname>,<str:ishueed>", ReturnIshuuedBook.as_view()),
    path("savereturnedbook", SaveReturnedBook.as_view()),
    path("login", LoginUserView.as_view()),
    path("logout", LogOutUserView.as_view()),
    path("user", UserView.as_view()),
]
