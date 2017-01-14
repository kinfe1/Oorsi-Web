import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth/auth.service';
import { NgForm } from '@angular/forms/src/directives';

declare const FB: any;

@Component({
    selector: 'oorsi-web-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    error: string;
    loading: boolean;


    constructor(private authService: AuthService, private router: Router) {
        FB.init({
            appId: '611971595616628',
            cookie: false,  // enable cookies to allow the server to access
            // the session
            xfbml: true,  // parse social plugins on this page
            version: 'v2.5' // use graph api version 2.5
        });
    }

    ngOnInit() {
        FB.getLoginStatus(response => {
            this.statusChangeCallback(response);
        });
    }

    onLogin(ngForm: NgForm) {

        this.authService.login(ngForm.value.email, ngForm.value.password).subscribe(result => {
            if (result === true) {
                // login successful
                this.router.navigate(['/']);
            } else {
                // login failed
                this.error = 'Username or password is incorrect';
                this.loading = false;
            }
        });
    }

    onFacebookLoginClick() {
        FB.login(response => {
            if (response.status === 'connected') {
                this.authService.facebookLogin(response.authResponse.accessToken).subscribe(data => {
                    if (data === true) {
                        // login successful
                        this.router.navigate(['/']);
                    } else {
                        this.router.navigate(['/register'], { skipLocationChange: true, queryParams: { fbat: response.authResponse.accessToken } });
                    }
                });
            }
        });
    }

    statusChangeCallback(response) {
        console.log(response);
        if (response.status === 'connected') {
            this.authService.facebookLogin(response.authResponse.accessToken).subscribe(data => console.log(data));
        } else if (response.status === 'not_authorized') {

        } else {

        }
    }



}
