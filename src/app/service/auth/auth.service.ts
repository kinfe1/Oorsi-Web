import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { CanActivate, Router } from '@angular/router';
import { Http, Jsonp, Response } from '@angular/http';
import { EventEmitter, Injectable } from '@angular/core';


@Injectable()
export class AuthService implements CanActivate {




    public isLoggedIn: EventEmitter<boolean>;

    constructor(private http: Http, private router: Router) {
        this.isLoggedIn = new EventEmitter();
        this.isLoggedIn.emit(this.canActivate());
    }


    canActivate(): boolean {


        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    }

    signup(firstName: string, lastName: string, lastname: string, email: string, password: string, confirmPassword: string) {

    }

    login(username: string, password: string): Observable<boolean> {
        return this.http.post('/oorsi-api/login', { username: username, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {


                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', token);

                    this.isLoggedIn.emit(this.canActivate());

                    // return true to indicate successful login
                    return true;
                } else {
                    this.isLoggedIn.emit(this.canActivate());
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.isLoggedIn.emit(this.canActivate());
    }

    getAuthHeader() {
        return { "jwt-token": localStorage.getItem('currentuser') }
    }





}
