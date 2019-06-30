// All die module die gebraucht werden damit die App starten kann
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { CoreModule } from './core/core.module';
import { RoutingModule } from './/routing.module';
import { MaterialModule } from './/material.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { RoutingGuard } from './routing.guard';
import { ChatModule } from './chat/chat.module';

import { AngularFireModule } from '@angular/fire';





@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    CoreModule,
    RoutingModule,
    SharedModule,
    MaterialModule,
    HttpClientModule,
    ChatModule
  ],
  providers: [RoutingGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
