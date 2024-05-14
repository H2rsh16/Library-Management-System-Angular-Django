import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthInterceptor } from '../interceptors/auth.interceptor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: any = FormGroup;
  err: any = false;
  msg: any;
  username: any;
  password: any;
  type = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private formbuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      email: '',
      password: '',
    });
  }

  CheckDetails() {
    this.username = this.form.getRawValue()['email'];
    this.password = this.form.getRawValue()['password'];

    if (this.username == '' && this.password == '') {
      this.err = true;
      this.msg = 'Details are invalid';
    } else if (this.username == '') {
      this.err = true;
      this.msg = 'Username is invalid';
    } else if (this.password == '') {
      this.err = true;
      this.msg = 'Password is invalid';
    } else {
      this.err = false;
      this.Submit();
    }
  }

  Inputvalidate() {
    this.err = false;
  }

  Submit() {
    this.username = this.form.getRawValue()['email'];
    this.password = this.form.getRawValue()['password'];
    this.http
      .post(
        'http://localhost:8000/api/login',
        {
          email: this.username,
          password: this.password,
        },
        { withCredentials: true }
      )
      .subscribe((res: any) => {
        if (res == 'Data is invalid') {
          this.err = true;
          this.msg = res;
        } else if (res == 'Incorrect Password') {
          this.err = true;
          this.msg = res;
        } else {
          AuthInterceptor.accessToken = res.token;
          this.CheckUserRoll();
          localStorage.setItem('LoggedIn', 'true');
        }
      });
  }

  CheckUserRoll() {
    this.http
      .get('http://localhost:8000/api/user', { withCredentials: true })
      .subscribe((res: any) => {
        this.type = res.type;
        if (this.type == 'Admin') {
          this.router.navigate(['/dashboardA']);
        }
        if (this.type == 'Student') {
          this.router.navigate(['/dashboardS']);
        }
      });
  }
}
