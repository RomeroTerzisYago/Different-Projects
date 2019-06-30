import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const  routes: Routes  = [

  {path: 'login', component: LoginComponent, data: {title: 'Login'}},
  {path: 'register', component: RegisterComponent, data: {title: 'Register'}},
  {path: 'reset-password', component: ResetPasswordComponent, data: {title: 'Reset password'}},
];

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ResetPasswordComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class AuthModule { }
