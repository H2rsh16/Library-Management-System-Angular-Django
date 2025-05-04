import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-showishueedbooks',
  templateUrl: './showishueedbooks.component.html',
  styleUrls: ['./showishueedbooks.component.css'],
})
export class ShowishueedbooksComponent implements OnInit {
  Data: any;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.ShowData();
  }
  ShowData() {
    this.http.get('https://library-management-system-angular-django.onrender.com/api/showishueedbook').subscribe(
      (res: any) => {
        this.Data = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
