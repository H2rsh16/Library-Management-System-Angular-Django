import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css'],
})
export class ForgotpasswordComponent implements OnInit {
  form: any = FormGroup;
  err: any = false;
  msg: any;
  name: any;
  code: any;
  username: any;
  password: any;
  cpassword: any;
  type: any;
  randomeCode: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private formbuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      name: '',
      email: '',
      password: '',
      cpassword: '',
      code: '',
    });
    this.GenerateCode();
  }

  CheckDetails() {
    this.name = this.form.getRawValue()['name'];
    this.username = this.form.getRawValue()['email'];
    this.password = this.form.getRawValue()['password'];
    this.cpassword = this.form.getRawValue()['cpassword'];
    this.code = this.form.getRawValue()['code'];

    if (this.name == '' && this.username == '' && this.password == '') {
      this.err = true;
      this.msg = 'Details are invalid';
    } else if (this.username == '' && this.password == '') {
      this.err = true;
      this.msg = 'Username and Password are invalid';
    } else if (this.name == '' && this.password == '') {
      this.err = true;
      this.msg = 'Name and Password are invalid';
    } else if (this.username == '' && this.name == '') {
      this.err = true;
      this.msg = 'Username and Name is invalid';
    } else if (this.name == '') {
      this.err = true;
      this.msg = 'Name is invalid';
    } else if (this.username == '') {
      this.err = true;
      this.msg = 'Username is invalid';
    } else if (this.password == '') {
      this.err = true;
      this.msg = 'Password is invalid';
    } else if (this.password !== this.cpassword) {
      this.err = true;
      this.msg = 'Password and Confirm Password are not matched';
    } else if (this.code != this.randomeCode) {
      this.err = true;
      this.msg = 'Code is not matched';
    } else {
      this.Submit();
      this.err = false;
    }
  }

  Inputvalidate() {
    this.err = false;
  }

  Submit() {
    this.name = this.form.getRawValue()['name'];
    this.username = this.form.getRawValue()['email'];
    this.password = this.form.getRawValue()['password'];

    if (this.name != '' && this.username != '' && this.password != '') {
      this.http
        .get(
          'http://localhost:8000/api/forgotpassword/' +
            this.name +
            ',' +
            this.username
        )
        .subscribe(
          (res: any) => {
            if (res != '') {
              this.http
                .patch(
                  'http://localhost:8000/api/forgotpassword/' +
                    this.name +
                    ',' +
                    this.username,
                  {
                    password: this.password,
                  }
                )
                .subscribe(
                  () => {
                    alert('Password Changed Successfully');
                    this.form.reset();
                  },
                  (error) => {
                    this.err = true;
                    this.msg = 'Invalid Data try Again';
                  }
                );
            }
          },
          (error) => {
            (this.err = true), (this.msg = 'Data is Invalid');
          }
        );
    }
  }

  GetCode() {
    length = 8;
    const charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';

    let tempCode = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      tempCode += charset[randomIndex];
    }

    return tempCode;
  }

  GenerateCode() {
    this.randomeCode = this.GetCode();
  }
}
