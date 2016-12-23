import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { CanActivate, Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService implements CanActivate {

  public token: string;

  constructor(private http: Http, private router: Router) { }

  canActivate() {

    if (this.token) {
      return true;
    }
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post('/oorsi-api/login', { username: username, password: password })
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let token = response.json() && response.json().token;
        if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      });
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
  }



}
