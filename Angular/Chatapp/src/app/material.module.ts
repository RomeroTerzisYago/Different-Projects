// All die Angular Material komponnenten die gebraucht werden
import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatRadioModule} from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatListModule} from '@angular/material/list';
@NgModule({
  exports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatListModule
  ],
  imports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatListModule
  ]
})
export class MaterialModule { }
