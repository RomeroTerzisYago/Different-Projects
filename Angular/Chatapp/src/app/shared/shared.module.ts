// Gemeinsame Module für alle Komponnenten
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { UploadComponent } from './upload/upload.component';
import { UploadService } from './upload/upload.service';

@NgModule({
  declarations: [NavbarComponent, UploadComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    NavbarComponent,
    UploadComponent
  ],
  providers: [UploadService]
})
export class SharedModule { }
