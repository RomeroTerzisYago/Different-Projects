import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: Observable<any[]>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }
  // User ServiceModule wird aufgerufen und Benutzern werden erhalten
  getUsers() {
    this.users = this.userService.getUsers();
  }

}
