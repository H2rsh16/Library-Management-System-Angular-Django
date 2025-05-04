import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  username: string = '';
  type: string = '';
  loggedIn: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.http.get('https://library-management-system-angular-django.onrender.com/api/user', { withCredentials: true })
      .subscribe({
        next: (res: any) => {
          this.username = res.name;
          this.type = res.type;
          this.loggedIn = true;
        },
        error: (err) => {
          console.error('User not authenticated', err);
          this.router.navigate(['/login']);
        }
      });
  }

  logout() {
    this.http.post('https://library-management-system-angular-django.onrender.com/api/logout', {}, { withCredentials: true })
      .subscribe({
        next: () => {
          localStorage.removeItem('LoggedIn');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Logout failed', err);
          localStorage.removeItem('LoggedIn');
          this.router.navigate(['/login']);
        }
      });
  }

  DoSomething(event: any) {
    const t = event.target as HTMLElement;
    const allElem = document.querySelectorAll('.item');

    allElem.forEach(e => e.classList.remove('active'));

    if (!t.classList.contains('active')) {
      t.classList.add('active');
    }
  }
}
