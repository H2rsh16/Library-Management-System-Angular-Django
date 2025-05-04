import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthInterceptor } from '../interceptors/auth.interceptor';
import { Observable } from 'rxjs';

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
    localStorage.clear();
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
  
  CheckUserRoll(): Observable<any> {
    return this.http.get('https://library-management-system-angular-django.onrender.com/api/user', { withCredentials: true });
  }

  Submit() {
    this.username = this.form.getRawValue()['email'];
    this.password = this.form.getRawValue()['password'];
  
    this.http.post(
      'https://library-management-system-angular-django.onrender.com/api/login',
      {
        email: this.username,
        password: this.password,
      },
      { withCredentials: true }
    ).subscribe((res: any) => {
      if (res == 'Data is invalid' || res == 'Incorrect Password') {
        this.err = true;
        this.msg = res;
      } else {
        AuthInterceptor.accessToken = res.token;
        localStorage.setItem('LoggedIn', 'true');
  
        this.CheckUserRoll().subscribe((userRes: any) => {
          this.type = userRes.type;
          if (this.type == 'admin') {
            this.router.navigate(['/dashboardA']);
          } else if (this.type == 'student') {
            this.router.navigate(['/dashboardS']);
          } else {
            this.err = true;
            this.msg = 'Unknown user role';
          }
        }, error => {
          this.err = true;
          this.msg = 'Failed to fetch user role';
        });
      }
    });
  }
}
