import { User } from '../../model/user';
import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { CanActivate, Router } from '@angular/router';
import { Http, Jsonp, Response, Headers, URLSearchParams } from '@angular/http';
import { EventEmitter, Injectable } from '@angular/core';
import { OORSI_API_ENDPOINT } from '../../const';


@Injectable()
export class AuthService {




    public isLoggedInEmitter: EventEmitter<boolean>;
    public fbat: string;

    public loggedInUserId: number;

    constructor(private http: Http, private router: Router) {
        this.isLoggedInEmitter = new EventEmitter();
        this.isLoggedInEmitter.emit(this.isLoggedIn());
    }


    isLoggedIn(): boolean {


        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page
        // this.router.navigate(['/login']);
        return false;
    }

    checkError(err) {
        if (err && err != null && err.status == 403) {
            this.logout();
        }
    }

    login(username: string, password: string): Observable<boolean> {
        let headers: Headers = new Headers();
        return this.http.post(OORSI_API_ENDPOINT + 'login', { username: username, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {


                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', token);

                    this.isLoggedInEmitter.emit(this.isLoggedIn());

                    // return true to indicate successful login
                    return true;
                } else {
                    this.isLoggedInEmitter.emit(this.isLoggedIn());
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    register(loginFormValue): Observable<boolean> {
        return this.http.post(OORSI_API_ENDPOINT + 'register', loginFormValue)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {


                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', token);

                    this.isLoggedInEmitter.emit(this.isLoggedIn());

                    // return true to indicate successful login
                    return true;
                } else {
                    //this.isLoggedIn.emit(this.canActivate());
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    facebookLogin(accessToken: string): Observable<boolean> {
        return this.http.post(OORSI_API_ENDPOINT + 'fbLogin', accessToken)
            .map((response: Response) => {

                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {


                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', token);

                    this.isLoggedInEmitter.emit(this.isLoggedIn());

                    // return true to indicate successful login
                    return true;
                } else {
                    // this.isLoggedIn.emit(this.canActivate());
                    // return false to indicate failed login
                    return false;
                }

            });
    }

    getFBUserInfo(accessToken): Observable<User> {
        return this.http.post(OORSI_API_ENDPOINT + 'fbUserInfo', accessToken)
            .map((response: Response) => {
                return response.json();
            });

    }

    logout(): void {
        // clear token remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.isLoggedInEmitter.emit(this.isLoggedIn());
    }

    addAuthHeader(headers: Headers): void {
        headers.append("jwt-token", localStorage.getItem('currentUser'));
    }





}
