import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { HomeComponent } from './home/home.component';
import { AddBooksComponent } from './add-books/add-books.component';
import { RemovebookComponent } from './removebook/removebook.component';
import { IshueebookComponent } from './ishueebook/ishueebook.component';
import { ReturnbookComponent } from './returnbook/returnbook.component';
import { HomeSComponent } from './home-s/home-s.component';
import { ShowbooksComponent } from './showbooks/showbooks.component';
import { ShowishueedbooksComponent } from './showishueedbooks/showishueedbooks.component';
import { ShowstudentsComponent } from './showstudents/showstudents.component';
import { ShowishueedofoneComponent } from './showishueedofone/showishueedofone.component';
import { ReturnedbooksComponent } from './returnedbooks/returnedbooks.component';
import { DatePipe } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ForgotpasswordComponent,
    HomeComponent,
    AddBooksComponent,
    RemovebookComponent,
    IshueebookComponent,
    ReturnbookComponent,
    HomeSComponent,
    ShowbooksComponent,
    ShowishueedbooksComponent,
    ShowstudentsComponent,
    ShowishueedofoneComponent,
    ReturnedbooksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    DatePipe,
    LoginComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
