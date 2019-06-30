import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user/user.model';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


import { Observable, of } from 'rxjs';
import { switchMap, first, map } from 'rxjs/operators';


import { Md5 } from 'ts-md5/dist/md5';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User>;
  authState: firebase.User;

// User wird erzeugt 
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        this.authState = user;
        console.log('Firebase User Object: ', this.authState);
        if (user) {
          console.log('App User: ', this.user);
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
    this.afAuth.authState.subscribe(data => this.authState = data);
  }
  getUser() {
    return this.user.pipe(first()).toPromise();
  }
  get authenticated(): boolean {
    return this.authState !== null;
  }
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : null;
  }
  async emailLogIn(email: string, password: string) {
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      return console.log('You have succesfully loged in');
    } catch (error) {
      return console.log(error.message);
    }
  }
  emailRegister(email: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(data => this.updateUserData(data.user))
      .then(() => console.log('Welcome, your account has been created!'))
      .then(() => {
        this.afAuth.auth.currentUser
          .sendEmailVerification()
          .then(() => console.log('We sent you an email verification'))
          .catch(error => console.log(error.message));
      })
      .catch(error => console.log(error.message));
  }
  async resetPassword(email: string) {
    try {
      await firebase
        .auth()
        .sendPasswordResetEmail(email);
      return console.log(`We've sent you a password reset link`);
    } catch (error) {
      return console.log(error.message);
    }
  }
  private socialLogin(provider) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(credential => {
        this.updateUserData(credential.user);
      })
      .catch(error => console.log(error.message));
  }
  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.socialLogin(provider);
  }
  // Benutzer Daten werden während Registrierung erzeugt und an Firebase store gesendet
  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL + 'https://www.gravatar.com/avatar/' + Md5.hashStr(user.email) + '?d=identicon'
    };
    return userRef.set(data, {merge: true});
  }
  async LogOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }

}
