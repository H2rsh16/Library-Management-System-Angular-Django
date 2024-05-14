# Library-Management-System-Angular-Django

1. Install all Dependencies mentioned below

  - Python (https://www.python.org)
  - MySQL Workbench (https://www.mysql.com)
  - NodeJs (https://nodejs.org/en)

2. Run Project -
   Open any Integrated Development Environment am using Visual Studio Code

   1) Frontend -
      - open terminal and type cd ./frontend/library
      - then run command "ng serve"
      - open project in "localhost://4200"
     
   2) Backend -
      - first you have to create database in sqlworkbench with name "library"
      - then run this command "python manage.py makemigrations"
      - then run this command "python manage.py migrate"
      - then run Database file
      - run command "python manage.py runserver"
