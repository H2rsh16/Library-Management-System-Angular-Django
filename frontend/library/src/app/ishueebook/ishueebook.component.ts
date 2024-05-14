import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ishueebook',
  templateUrl: './ishueebook.component.html',
  styleUrls: ['./ishueebook.component.css'],
})
export class IshueebookComponent {
  form: any = FormGroup;
  err: any = false;
  msg: any;
  name: any;
  author: any;
  idate: any;
  rdate: any;
  studentname = '';
  temp = 0;
  q = 0;

  constructor(
    private http: HttpClient,
    private formbulder: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.form = this.formbulder.group({
      bname: '',
      aname: '',
      idate: '',
      rdate: '',
    });
  }

  CheckDetails() {
    this.name = this.form.getRawValue()['bname'];
    this.author = this.form.getRawValue()['aname'];
    this.idate = this.form.getRawValue()['idate'];
    this.rdate = this.form.getRawValue()['rdate'];

    if (
      this.name == '' &&
      this.author == '' &&
      this.idate == '' &&
      this.rdate == ''
    ) {
      this.err = true;
      this.msg = 'Details Are Invalid';
    } else if (this.name == '' && this.author == '' && this.idate == '') {
      this.err = true;
      this.msg = 'Book Name, Author name and Ishuee Date Are Invalid';
    } else if (this.author == '' && this.idate == '' && this.rdate == '') {
      this.err = true;
      this.msg = 'Author name, Ishuee Date and Return Date Are Invalid';
    } else if (this.name == '' && this.idate == '' && this.rdate == '') {
      this.err = true;
      this.msg = 'Book name, Ishuee Date and Return Date Are Invalid';
    } else if (this.name == '' && this.author == '' && this.rdate == '') {
      this.err = true;
      this.msg = 'Book name, Auhtor name and Return Date Are Invalid';
    } else if (this.name == '' && this.author == '') {
      this.err = true;
      this.msg = 'Book and Author names Are Invalid';
    } else if (this.author == '' && this.idate == '') {
      this.err = true;
      this.msg = 'Author name and Ishueed Date Are Invalid';
    } else if (this.idate == '' && this.rdate == '') {
      this.err = true;
      this.msg = 'Ishueed Date and Return Date Are Invalid';
    } else if (this.rdate == '' && this.name == '') {
      this.err = true;
      this.msg = 'Return Date and Book name Are Invalid';
    } else if (this.name == '' && this.idate == '') {
      this.err = true;
      this.msg = 'Book name and Ishueed Date Are Invalid';
    } else if (this.author == '' && this.rdate == '') {
      this.err = true;
      this.msg = 'Author name and Return Date Are Invalid';
    } else if (this.name == '') {
      this.err = true;
      this.msg = 'Book Name Are Invalid';
    } else if (this.author == '') {
      this.err = true;
      this.msg = 'Author name Are Invalid';
    } else if (this.idate == '') {
      this.err = true;
      this.msg = 'Ishueed Date Are Invalid';
    } else if (this.rdate == '') {
      this.err = true;
      this.msg = 'Return Date Are Invalid';
    } else {
      this.Submit();
      this.err = false;
    }
  }
  Inputvalidate() {
    this.err = false;
  }

  Submit() {
    this.name = this.form.getRawValue()['bname'];
    this.author = this.form.getRawValue()['aname'];

    if (this.name != '' && this.author != '') {
      this.http
        .get(
          'http://localhost:8000/api/checkishueebook/' +
            this.name +
            ',' +
            this.author
        )
        .subscribe(
          (res: any) => {
            if (res == '') {
              this.msg = true;
              this.msg = res.message;
            } else if (res.quantity <= 0) {
              this.err = true;
              this.msg = 'Book is Not Available, come Later!!';
            } else {
              this.IshueeABook();
              this.form.reset();
            }
          },
          (error) => {
            (this.err = true), (this.msg = 'Book Not Found');
          }
        );
    }
  }

  IshueeABook() {
    this.name = this.form.getRawValue()['bname'];
    this.idate = this.form.getRawValue()['idate'];
    this.rdate = this.form.getRawValue()['rdate'];

    const partsi = this.idate.split('-');
    const partsr = this.rdate.split('-');
    let newStri = partsi[2] + '-' + partsi[1] + '-' + partsi[0];
    let newStrr = partsr[2] + '-' + partsr[1] + '-' + partsr[0];

    this.http
      .get('http://localhost:8000/api/user', { withCredentials: true })
      .subscribe((res: any) => {
        this.http
          .post('http://localhost:8000/api/ishueebook', {
            bookname: this.name,
            studentname: res.name,
            ishueed: newStri,
            returnd: newStrr,
          })
          .subscribe(() => {
            this.form.reset();
            alert('Book Ishueed Successfully !!');
            this.ChangeQuantity();
          });
      });
  }

  ChangeQuantity() {
    this.http
      .get(
        'http://localhost:8000/api/changequantity/' +
          this.name +
          ',' +
          this.author
      )
      .subscribe((res: any) => {
        this.q = res;
        this.temp = this.q - 1;
        this.http
          .patch(
            'http://localhost:8000/api/changequantity/' +
              this.name +
              ',' +
              this.author,
            {
              quantity: this.temp,
            }
          )
          .subscribe();
      });
  }
}
