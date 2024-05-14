create database librarymanagement;

use librarymanagement;

drop database librarymanagement;

truncate librarymanagement;

select * from librarymanagement;

delete from librarymanagement.library_user;

select * from library_user;

describe library_user;

truncate table library_user;

-- --------- Truncate User Table -----------

SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE table library_user;

SET FOREIGN_KEY_CHECKS = 1;

--------------------------------------------

TRUNCATE table library_books;

TRUNCATE table library_ishueedbooks;

TRUNCATE table library_returnedbooks;


select * from librarymanagement.library_books;

select * from library_ishueedbooks;

insert into library_books(bookname, bookdescription, bookcategory, authorname, quantity) values('Python', 'Python', 'Programming', 'Manisha Bharambe', 20),
('C', 'C programming', 'Programming', 'Manisha Bharambe', 20),
('Core Java', 'Java programming', 'Programming', 'Manisha Bharambe', 20),
('Advance Java', 'Advance Java programming', 'Programming', 'Nikhil H. Deshpande', 20),
('CPP', 'Advance C programming', 'Programming', 'Manisha Bharambe', 20),
('PHP', 'Hypertext Preprocessor', 'Programming', 'Gajanan A. Deshmukh', 20),
('Node JS', 'Javscript Framework(Node.Js)', 'Programming', 'Shivendu Bhushan', 20),
('Angular JS', 'Javascript Framework(Angular.js)', 'Programming', 'Gajanan A. Deshmukh', 20),
('Android Programming', 'Android Development', 'Programming', 'Kamil Ajmal Khan', 20);


select is_active, is_staff from library_user;