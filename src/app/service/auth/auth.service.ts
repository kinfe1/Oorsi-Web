import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor(private http: Http) { }

  public isAuthenticated(): boolean {
    let isAuthenticated: boolean = false;
    this.http.get("").subscribe(data => isAuthenticated = true);
    return isAuthenticated;
  }

  

}
