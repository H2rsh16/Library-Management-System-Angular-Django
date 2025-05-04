import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-returnbook',
  templateUrl: './returnbook.component.html',
  styleUrls: ['./returnbook.component.css'],
})
export class ReturnbookComponent implements OnInit {
  form: any = FormGroup;
  err: any = false;
  msg: any;
  author: any;
  name: any;
  idate: string = '';
  q = 0;
  temp = 0;
  a = '';
  username = '';

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
    });

    this.http
      .get('https://library-management-system-angular-django.onrender.com/api/user', { withCredentials: true })
      .subscribe((res: any) => {
        this.username = res.name;
      });
  }

  CheckDetails() {
    this.name = this.form.getRawValue()['bname'];
    this.author = this.form.getRawValue()['aname'];
    this.idate = this.form.getRawValue()['idate'];
    if (this.name == '' && this.idate == '' && this.author == '') {
      this.err = true;
      this.msg = 'Details Are Invalid';
    } else if (this.name == '' && this.author == '') {
      this.err = true;
      this.msg = 'Book and Author names Are Invalid';
    } else if (this.author == '' && this.idate == '') {
      this.err = true;
      this.msg = 'Author name and Ishueed Date is Invalid';
    } else if (this.name == '' && this.idate == '') {
      this.err = true;
      this.msg = 'Book name and Ishueed Date Invalid';
    } else if (this.author == '') {
      this.err = true;
      this.msg = 'Author Name is Invalid';
    } else if (this.name == '') {
      this.err = true;
      this.msg = 'Book Name is Invalid';
    } else if (this.idate == '') {
      this.err = true;
      this.msg = 'Book Ishuee Date is Invalid';
    } else {
      this.err = false;
      this.Submit();
    }
  }
  Inputvalidate() {
    this.err = false;
  }

  Submit() {
    this.name = this.form.getRawValue()['bname'];
    this.author = this.form.getRawValue()['aname'];
    this.idate = this.form.getRawValue()['idate'];

    const partsi = this.idate.split('-');
    let newStri = partsi[2] + '-' + partsi[1] + '-' + partsi[0];

    this.http
      .get(
        'https://library-management-system-angular-django.onrender.com/api/checkreturnbook/' +
          this.name +
          ',' +
          this.username
      )
      .subscribe(
        (res: any) => {
          if (res) {
            this.http
              .delete(
                'https://library-management-system-angular-django.onrender.com/api/returnishueedbook/' +
                  this.name +
                  ',' +
                  newStri
              )
              .subscribe(
                () => {
                  this.ChangeQuantity();
                  this.http
                    .post('https://library-management-system-angular-django.onrender.com/api/savereturnedbook', {
                      bookname: this.name,
                      studentname: this.username,
                      ishueed: newStri,
                    })
                    .subscribe(() => {
                      alert('Book Returned Successfully');
                    });
                }
              );
          }
        },
        (error) => {
          this.err = true;
          this.msg = 'Book not Found';
        }
      );
  }

  ChangeQuantity() {
    this.http
      .get(
        'https://library-management-system-angular-django.onrender.com/api/changequantity/' +
          this.name +
          ',' +
          this.author,
        {}
      )
      .subscribe(
        (res: any) => {
          this.q = res;
          this.temp = this.q + 1;
          this.http
            .patch(
              'https://library-management-system-angular-django.onrender.com/api/changequantity/' +
                this.name +
                ',' +
                this.author,
              {
                quantity: this.temp,
              }
            )
            .subscribe();

          this.form.reset();
        },
        (error) => {
          this.err = true;
          this.msg = 'Book Not Found';
        }
      );
  }
}
