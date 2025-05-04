import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
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
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboardA',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      {
        path: 'addbooks',
        component: AddBooksComponent,
      },
      {
        path: 'removebooks',
        component: RemovebookComponent,
      },
      { path: 'showbooks', component: ShowbooksComponent },
      { path: 'showishueedbooks', component: ShowishueedbooksComponent },
      { path: 'showstudents', component: ShowstudentsComponent },
      { path: 'returnedbooks', component: ReturnedbooksComponent },
      { path: '**', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
  {
    path: 'dashboardS',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'homes', pathMatch: 'full' },
      { path: 'homes', component: HomeSComponent },
      { path: 'ishueebook', component: IshueebookComponent },
      { path: 'returnbook', component: ReturnbookComponent },
      { path: 'showbooks', component: ShowbooksComponent },
      { path: 'showishueedofone', component: ShowishueedofoneComponent },
      { path: '**', redirectTo: 'homes', pathMatch: 'full' },  
    ],
  },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
