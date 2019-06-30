import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

// Routes für App aufruf
const  routes: Routes  = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: '', loadChildren: './auth/auth.module#AuthModule'},
  { path: '', loadChildren: './chat/chat.module#ChatModule' },
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class RoutingModule { }
