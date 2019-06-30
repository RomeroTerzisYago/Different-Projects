import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UserService } from './user.service';
import { RouterModule, Routes } from '@angular/router';

import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserListItemComponent } from './user-list-item/user-list-item.component';
import { RoutingGuard } from '../routing.guard';

// Interner Routing der App nach einlogen

const routes: Routes = [
  { path: 'dashboard', component: UserDashboardComponent, canActivate: [RoutingGuard], data: { title: 'Dashboard'}},
  { path: 'users', component: UserListComponent, data: { title: 'Users'}},
  { path: 'users/:id', component: UserDetailComponent, data: { title: 'Profile'}},
];

@NgModule({
  declarations: [
    UserDashboardComponent,
    UserDetailComponent,
    UserListComponent,
    UserListItemComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [ UserListItemComponent ],
  providers: [UserService]
})
export class UserModule { }
