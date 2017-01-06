import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth/auth.service';
import { NgForm } from '@angular/forms/src/directives';

// declare const FB: any;

@Component({
  selector: 'oorsi-web-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: string;
  loading: boolean;

  resp: any;

  constructor(private authService: AuthService, private router: Router) {
    // FB.init({
    //   appId: '611971595616628',
    //   cookie: false,  // enable cookies to allow the server to access
    //   // the session
    //   xfbml: true,  // parse social plugins on this page
    //   version: 'v2.5' // use graph api version 2.5
    // });
  }

  ngOnInit() {

    // FB.getLoginStatus(response => {
    //   this.resp = response;
    //   this.statusChangeCallback();
    // });
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
    // FB.login();
  }

  statusChangeCallback() {

    console.log(this.resp);
    if (this.resp.status === 'connected') {
      // connect here with your server for facebook login by passing access token given by facebook
    } else if (this.resp.status === 'not_authorized') {

    } else {

    }
  };

}
