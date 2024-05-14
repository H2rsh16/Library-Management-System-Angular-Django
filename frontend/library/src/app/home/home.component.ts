import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  type = '';
  noBooks = 0;
  noStudents = 0;
  noIshueedBooks = 0;
  noReturnedBooks = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get('http://localhost:8000/api/user', { withCredentials: true })
      .subscribe((res: any) => {
        this.type = res.type;
      });
    this.http
      .get('http://localhost:8000/api/bookscount', { withCredentials: true })
      .subscribe((res: any) => {
        this.noBooks = res;
      });
    this.http
      .get('http://localhost:8000/api/studentscount', { withCredentials: true })
      .subscribe((res: any) => {
        this.noStudents = res;
      });
    this.http
      .get('http://localhost:8000/api/returnedbookscount', {
        withCredentials: true,
      })
      .subscribe((res: any) => {
        this.noReturnedBooks = res;
      });
    this.http
      .get('http://localhost:8000/api/ishueedbookscount', {
        withCredentials: true,
      })
      .subscribe((res: any) => {
        this.noIshueedBooks = res;
      });
  }
}
