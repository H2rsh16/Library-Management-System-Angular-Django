# Library-Management-System-Angular-Django

1. Install all Dependencies mentioned below

  - Python (https://www.python.org)
  - MySQL Community-Installer (https://www.mysql.com)
      - MySQL Server
      - MySQL Workbench
  - NodeJs (https://nodejs.org/en)

Fisrtly you have

2. Run Project -
   Open Two Terminals (Important) and perform mentioned task on that you can use any Integrated Development Environment am using Visual Studio Code

   1) Frontend -
      - open terminal and type cd ./frontend/library
      - then run command "ng serve"
      - open project in "localhost://4200" on any Browser
     
   2) Backend -
      - first you have to set your HostName and Password in this file "./backend/backend/Data.py" 
      - after execute database file (Starter.sql)
      - then change directory run command "cd ./backend"
      - then run this command "python manage.py makemigrations library"
      - then run this command "python manage.py migrate library"
      - execute database file (data.sql)
      - run command "python manage.py runserver"
