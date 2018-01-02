import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Injectable()
export class AnonymousService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    let isLoggedIn = this.authService.isLoggedIn();
    if (!isLoggedIn) {
      return true;
    } else {
      this.router.navigate([""]);
    }
  }

}
