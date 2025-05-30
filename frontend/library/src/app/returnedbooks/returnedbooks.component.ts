import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-returnedbooks',
  templateUrl: './returnedbooks.component.html',
  styleUrls: ['./returnedbooks.component.css'],
})
export class ReturnedbooksComponent implements OnInit {
  Data: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.ShowData();
  }

  ShowData() {
    this.http
      .get('https://library-management-system-angular-django.onrender.com/api/showreturnedbook')
      .subscribe((res: any) => {
        this.Data = res;
      });
  }
}
