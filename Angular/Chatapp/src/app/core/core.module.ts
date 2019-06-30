import { NgModule } from '@angular/core';
import { AuthService } from './auth.service';
import { AuthModule } from '../auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { UserModule } from '../user/user.module';


@NgModule({
  declarations: [],
  imports: [
    AuthModule,
    BrowserAnimationsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    UserModule
  ],
  providers: [ AuthService]
})
export class CoreModule { }
