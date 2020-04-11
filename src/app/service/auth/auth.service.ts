import { User } from '../../model/user';
import { CanActivate, Router } from '@angular/router';
import { EventEmitter, Injectable } from '@angular/core';
import { OORSI_API_ENDPOINT } from '../../const';
import { HttpClient } from '@angular/common/http';
import { Token } from '../../model/token';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthService {




    public isLoggedInEmitter: EventEmitter<boolean>;
    public fbat: string;

    public loggedInUserId: number;

    constructor(private http: HttpClient, private router: Router) {
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
        if (err && err != null && (err.status == 403|| err.status == 401)) {
            this.logout();
            this.router.navigate(['login']);
            return true;
        }
    }

    login(username: string, password: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            return this.http.post<Token>(OORSI_API_ENDPOINT + 'login', { username: username, password: password })
                .subscribe(data => {
                    // login successful if there's a jwt token in the response
                    let token = data && data.token;
                    if (token) {


                        // store username and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', token);

                        this.isLoggedInEmitter.emit(this.isLoggedIn());

                        // return true to indicate successful login
                        resolve(true);
                    } else {
                        this.isLoggedInEmitter.emit(this.isLoggedIn());
                        // return false to indicate failed login
                        resolve(false);
                    }
                }, (err) => {
                  console.log('login failed from auth servie', err);
                  reject(err.error);
                });
        })
    }

    register(loginFormValue): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.http.post<Token>(OORSI_API_ENDPOINT + 'register', loginFormValue)
                .subscribe(data => {
                    // login successful if there's a jwt token in the response
                    let token = data && data.token;
                    if (token) {


                        // store username and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', token);

                        this.isLoggedInEmitter.emit(this.isLoggedIn());

                        // return true to indicate successful login
                        resolve(true);
                    } else {
                        //this.isLoggedIn.emit(this.canActivate());
                        // return false to indicate failed login
                        resolve(false);
                    }
                }, err => {
                  reject(err.error)
                });
        });

    }

    facebookLogin(accessToken: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.http.post<Token>(OORSI_API_ENDPOINT + 'fbLogin', accessToken)
                .subscribe(data => {

                    // login successful if there's a jwt token in the response
                    let token = data && data.token;
                    if (token) {


                        // store username and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', token);

                        this.isLoggedInEmitter.emit(this.isLoggedIn());

                        // return true to indicate successful login
                        resolve(true);
                    } else {
                        // this.isLoggedIn.emit(this.canActivate());
                        // return false to indicate failed login
                        resolve(false);
                    }

                });
        });
    }

    getFBUserInfo(accessToken): Observable<User> {
        return this.http.post<User>(OORSI_API_ENDPOINT + 'fbUserInfo', accessToken);

    }

    logout(): void {
        // clear token remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.isLoggedInEmitter.emit(this.isLoggedIn());
    }





}
