import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-showstudents',
  templateUrl: './showstudents.component.html',
  styleUrls: ['./showstudents.component.css'],
})
export class ShowstudentsComponent implements OnInit {
  Data: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.ShowData();
  }

  ShowData() {
    this.http.get('https://library-management-system-angular-django.onrender.com/api/showstudents').subscribe(
      (res: any) => {
        this.Data = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
