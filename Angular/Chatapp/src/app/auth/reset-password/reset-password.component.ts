import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  email: string;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {}
  async resetPassword() {
    await this.auth.resetPassword(this.email);
    return await this.router.navigate(['/login']);
  }
}
