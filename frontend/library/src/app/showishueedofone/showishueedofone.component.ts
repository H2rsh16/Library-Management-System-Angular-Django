import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-showishueedofone',
  templateUrl: './showishueedofone.component.html',
  styleUrls: ['./showishueedofone.component.css'],
})
export class ShowishueedofoneComponent implements OnInit {
  Data: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.ShowData();
  }

  ShowData() {
    this.http
      .get('https://library-management-system-angular-django.onrender.com/api/user', { withCredentials: true })
      .subscribe((res: any) => {
        this.http
          .get('http://localhost:8000/api/showishueedofone/' + res.name)
          .subscribe(
            (res: any) => {
              this.Data = res;
            },
            (error) => {
              console.log(error);
            }
          );
      });
  }
}
