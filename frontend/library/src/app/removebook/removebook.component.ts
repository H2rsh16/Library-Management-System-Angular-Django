import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-removebook',
  templateUrl: './removebook.component.html',
  styleUrls: ['./removebook.component.css'],
})
export class RemovebookComponent implements OnInit {
  form: any = FormGroup;
  err: any = false;
  msg: any;
  name: any;
  author: any;

  constructor(
    private http: HttpClient,
    private formbulder: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.form = this.formbulder.group({
      bname: '',
      aname: '',
    });
  }

  CheckDetails() {
    this.name = this.form.getRawValue()['bname'];
    this.author = this.form.getRawValue()['aname'];
    if (this.name == '' && this.author == '') {
      this.err = true;
      this.msg = 'Details Are Invalid';
    } else if (this.name == '') {
      this.err = true;
      this.msg = 'Book Name are Invalid';
    } else if (this.author == '') {
      this.err = true;
      this.msg = 'Books Author Name are Invalid';
    } else {
      this.Submit();
      this.err = false;
    }
  }

  Delete() {
    alert('Confirm to Delete!!');
    this.RemoveAllBooks();
  }

  Submit() {
    this.name = this.form.getRawValue()['bname'];
    this.author = this.form.getRawValue()['aname'];
    this.http
      .delete(
        'https://library-management-system-angular-django.onrender.com/api/removebook/' + this.name + ',' + this.author
      )
      .subscribe(
        () => {
          alert('Book Deleted Successfully');
          this.form.reset();
        },
        (error) => {
          this.err = true;
          this.msg = 'Book Not Found !!';
        }
      );
  }

  Inputvalidate() {
    this.err = false;
  }

  RemoveAllBooks() {
    this.http.get('https://library-management-system-angular-django.onrender.com/api/showbook').subscribe(
      (res: any) => {
        if (res == '') {
          alert('Books are Empty!!');
        } else {
          this.http
            .delete('https://library-management-system-angular-django.onrender.com/api/removeallbooks')
            .subscribe(
              () => {
                alert('All Books are Deleted');
              },
              (error) => {
                this.err = true;
                this.msg = 'Library is Empty';
              }
            );
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
