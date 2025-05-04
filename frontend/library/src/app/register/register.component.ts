import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})



export class RegisterComponent implements OnInit {
  form: any = FormGroup;
  err: any = false;
  msg: any;
  name: any;
  username: any;
  password: any;
  cpassword: any;
  type: any;

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
      type: '',
    });
  }

  CheckDetails() {
    this.name = this.form.getRawValue()['name'];
    this.username = this.form.getRawValue()['email'];
    this.password = this.form.getRawValue()['password'];
    this.cpassword = this.form.getRawValue()['cpassword'];

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
    this.type = this.form.getRawValue()['type'];
    this.http
      .post('http://localhost:8000/api/register', {
        name: this.name,
        email: this.username,
        password: this.password,
        type: this.type,
      })
      .subscribe(
        () => {
          alert('User Registered');
          this.router.navigate(['/login']);
        },
        (error) => {
          this.err = true;
          this.msg = 'Invalid Details';
        }
      );
    this.err = false;
  }
}
