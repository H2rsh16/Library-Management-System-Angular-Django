import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-s',
  templateUrl: './home-s.component.html',
  styleUrls: ['./home-s.component.css'],
})
export class HomeSComponent implements OnInit {
  constructor(private http: HttpClient) {}

  type = '';

  ngOnInit(): void {
    this.http
      .get('http://localhost:8000/api/user', { withCredentials: true })
      .subscribe((res: any) => {
        this.type = res.type;
      });
  }
}
