import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../user.service';
import { User } from '../user.model';
import { ThreadService } from '../../chat/thread.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private threadService: ThreadService
    ) { }

  ngOnInit() {
    this.getUser();
  }
  // UserService wird aufgerufen und Benutzern werden gelesen
  getUser(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id).subscribe(user => (this.user = user));
  }
  // Chatverlauf wird aufgerufen
  async chat() {
    const profileId = this.route.snapshot.paramMap.get('id');
    try {
      await this.threadService
        .createThread(profileId);
      return console.log('Thread created!');
    } catch (error) {
      return console.log(error);
    }
  }
}
