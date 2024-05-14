import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.css'],
})
export class AddBooksComponent implements OnInit {
  form: any = FormGroup;
  err: any = false;
  msg: any;
  name: any;
  author: any;
  description: any;
  category: any;
  quantity: any;

  constructor(
    private http: HttpClient,
    private formbulder: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.form = this.formbulder.group({
      name: '',
      author: '',
      description: '',
      category: '',
      quantity: '',
    });
  }

  CheckDetails() {
    this.name = this.form.getRawValue()['name'];
    this.author = this.form.getRawValue()['author'];
    this.description = this.form.getRawValue()['description'];
    this.category = this.form.getRawValue()['category'];
    this.quantity = this.form.getRawValue()['quantity'];

    if (
      this.name == '' &&
      this.author == '' &&
      this.description == '' &&
      this.category == '' &&
      this.quantity == ''
    ) {
      this.err = true;
      this.msg = 'Details are invalid';
    } else if (
      this.author == '' &&
      this.description == '' &&
      this.category == '' &&
      this.quantity == ''
    ) {
      this.err = true;
      this.msg =
        'Author Name, Book Description, Book Category and Book Quantity are invalid';
    } else if (
      this.name == '' &&
      this.description == '' &&
      this.category == '' &&
      this.quantity == ''
    ) {
      this.err = true;
      this.msg =
        'Bookname, Book Description, Book Category and Book Quantity are invalid';
    } else if (
      this.name == '' &&
      this.author == '' &&
      this.category == '' &&
      this.quantity == ''
    ) {
      this.err = true;
      this.msg =
        'Bookname, Book Author, Book Category and Book Quantity are invalid';
    } else if (
      this.name == '' &&
      this.author == '' &&
      this.description == '' &&
      this.quantity == ''
    ) {
      this.err = true;

      this.msg =
        'Bookname, Book Author, Book Description and Book Quantity are invalid';
    } else if (
      this.name == '' &&
      this.author == '' &&
      this.description == '' &&
      this.category == ''
    ) {
      this.err = true;

      this.msg =
        'Bookname, Book Author, Book Description and Book Category are invalid';
    } else if (
      this.description == '' &&
      this.category == '' &&
      this.quantity == ''
    ) {
      this.err = true;

      this.msg =
        'Book Description, Book Category and Book Quantity are invalid';
    } else if (this.name == '' && this.category == '' && this.quantity == '') {
      this.err = true;

      this.msg = 'Book Name, Book Category and Book Quantity are Invalid';
    } else if (this.name == '' && this.author == '' && this.quantity == '') {
      this.err = true;

      this.msg = 'Book Name, Book Author and Book Quntity are invalid';
    } else if (this.name == '' && this.author == '' && this.description == '') {
      this.err = true;

      this.msg = 'Book Name, Book Author and Book Description are Invalid';
    } else if (this.name == '' && this.author == '') {
      this.err = true;
      this.msg = 'Book Name and Book Author are Invalid';
    } else if (this.author == '' && this.description == '') {
      this.err = true;
      this.msg = 'Book Author and Book Description are Invalid';
    } else if (this.description == '' && this.category == '') {
      this.err = true;
      this.msg = 'Book Description and Book Category are Invalid';
    } else if (this.category == '' && this.quantity == '') {
      this.err = true;
      this.msg = 'Book Category and Book Qunatity are Invalid';
    } else if (this.quantity == 0) {
      this.err = true;
      this.msg = 'Quantity cannot be null';
    } else if (this.quantity < 0) {
      this.err = true;
      this.msg = 'Quantity Invalid';
    } else if (this.name == '') {
      this.err = true;
      this.msg = 'Book Name is Invalid';
    } else if (this.author == '') {
      this.err = true;
      this.msg = 'Book Author is Invalid';
    } else if (this.description == '') {
      this.err = true;
      this.msg = 'Book Description is Invalid';
    } else if (this.category == '') {
      this.err = true;
      this.msg = 'Book Category is Invalid';
    } else if (this.quantity == '') {
      this.err = true;
      this.msg = 'Book Quantity is Invalid';
    } else {
      this.Submit();
      this.err = false;
    }
  }

  Submit() {
    this.name = this.form.getRawValue()['name'];
    this.author = this.form.getRawValue()['author'];
    this.description = this.form.getRawValue()['description'];
    this.category = this.form.getRawValue()['category'];
    this.quantity = this.form.getRawValue()['quantity'];
    this.http
      .post('http://localhost:8000/api/addbook', {
        bookname: this.name,
        authorname: this.author,
        bookdescription: this.description,
        bookcategory: this.category,
        quantity: this.quantity,
      })
      .subscribe(
        (result) => {
          // Handle result
          // console.log(result);
        },
        (error) => {
          if (error) {
            this.err = true;
            this.msg = 'Data is Invalid';
          }
        },
        () => {
          // 'onCompleted' callback.
          // No errors, route to new page here
          alert('Book Added Successfully');
          this.form.reset();
        }
      );
  }

  Inputvalidate() {
    this.err = false;
  }
}
