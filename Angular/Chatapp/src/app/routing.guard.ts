import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './core/auth.service';
import { Observable } from 'rxjs';

// Überprüft das Routing von routing.module

@Injectable({
  providedIn: 'root'
})
export class RoutingGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.auth.authenticated) {
        this.router.navigate(['/login']);
        console.log('not autorized, pleas log in');
        return false;
      }
      console.log('welcome');
      return true;
  }
}
