import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { SharedModule } from '../../shared/shared.module';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LogInForm: FormGroup;
  hide = true;

  constructor(public fb: FormBuilder, public auth: AuthService, private router: Router) {
    this.LogInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
          Validators.minLength(6),
          Validators.maxLength(25)
        ]
      ]
    });
   }

  ngOnInit() {}
  get email() {
    return this.LogInForm.get('email');
  }
  get password() {
    return this.LogInForm.get('password');
  }
  async LogIn() {
    const user = await this.auth.emailLogIn(this.email.value, this.password.value);
    if (this.LogInForm.valid) {
      this.router.navigate(['/dashboard']);
    }
  }
}
