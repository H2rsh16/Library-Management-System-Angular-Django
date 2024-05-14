import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  username = '';
  type = '';
  loggedIn: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private login: LoginComponent
  ) {}

  ngOnInit() {
    this.http
      .get('http://localhost:8000/api/user', { withCredentials: true })
      .subscribe((res: any) => {
        this.username = res.name;
        this.type = res.type;
      });

    document.addEventListener('loadeddata', this.DoSomething);
    let log = localStorage.getItem('LoggedIn');
    console.log(log);
  }

  logout() {
    this.http
      .post('http://localhost:8000/api/logout', {}, { withCredentials: true })
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
    localStorage.removeItem('LoggedIn');
  }

  DoSomething(event: any = '') {
    let t = event.target;
    let allElem = document.querySelectorAll('.item');

    allElem.forEach((e) => {
      if (e.classList.contains('active')) {
        e.classList.remove('active');
      }
    });

    if (t.classList.contains('active')) {
      t.classList.remove('active');
    }
    if (!t.classList.contains('active')) {
      t.classList.add('active');
    }
  }
}
