import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AuthService } from '../../core/auth.service';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  editing = false;
  user: User;

  task: AngularFireUploadTask;
  path: string;
  meta: object;
  uploadType: boolean;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private storage: AngularFireStorage,
    private location: Location
  ) { }

  ngOnInit() {
    this.getUser();
  }
  // Inhalt voM Edit profile Seite wird gesetzt
  setUploadData() {
    const uid = this.auth.currentUserId;
    return this.auth.user.subscribe(user => {
      if (user) {
        this.path = `users/${user.uid}/gallery`;
        this.meta = { uploader: user.uid};
        this.uploadType = true;
      }
    });
  }
  // Benutzer wird aufgerufen
  getUser() {
    return this.auth.user.subscribe(user => (this.user = user));
  }
  updateProfile() {
    return this.userService.updateProfileData(this.user.displayName, this.user.photoURL);
  }
  updateEmail() {
    return this.userService.updateEmailData(this.user.email);
  }
  uploadPhotoURL(event): void {
    const file = event.target.files[0];
    const path = `users/${this.user.uid}/photos/${file.name}`;
    if (file.type.split('/')[0] !== 'image') {
      return alert('only images allowed');
    } else {
      this.task = this.storage.upload(path, file);
      const ref = this.storage.ref(path);
      ref.getDownloadURL().subscribe(url => {
        this.userService.updateProfileData(this.user.displayName, url);
      });
    }
  }
  // Benutzer daten wirden gesetzt und an updateUserData weitergeleitet
  updateUser() {
    const data = {
      username: this.user.username || null,
      location: this.user.location || null,
      bio: this.user.bio || null,
      age: this.user.age || null,
      gender: this.user.gender || null
    };
    return this.userService.updateUserData(data);
  }
  goBack() {
    this.location.back();
  }
}
