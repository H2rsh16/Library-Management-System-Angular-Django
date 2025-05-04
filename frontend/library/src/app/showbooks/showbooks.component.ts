import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-showbooks',
  templateUrl: './showbooks.component.html',
  styleUrls: ['./showbooks.component.css'],
})
export class ShowbooksComponent implements OnInit {
  constructor(private http: HttpClient) {}
  Data: any;
  screen_name!: "Harsh";

  ngOnInit(): void {
    
    this.ShowData();
  }

  ShowData() {
    this.http.get('https://library-management-system-angular-django.onrender.com/api/showbook').subscribe(
      (res: any) => {
        this.Data = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
