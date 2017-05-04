import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Injectable()
export class LoggedInUserService implements CanActivate {

  constructor(private authService: AuthService) { }

  canActivate(): boolean {
    return this.authService.isLoggedIn();
  }


}
