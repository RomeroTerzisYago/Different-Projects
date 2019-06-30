import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { Observable } from 'rxjs';

import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  RegisterForm: FormGroup;
  hide = true;
  constructor(public fb: FormBuilder, public auth: AuthService, private router: Router) {
    this.RegisterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
          Validators.minLength(6),
          Validators.maxLength(16)
        ]
      ],
    });
   }
  ngOnInit() {}
  get email() {
    return this.RegisterForm.get('email');
  }
  get password() {
    return this.RegisterForm.get('password');
  }
  async Register() {
    const user = await this.auth.emailRegister(this.email.value, this.password.value);
    if (this.RegisterForm.valid) {
      this.router.navigate(['/login']);
    }
  }
}
