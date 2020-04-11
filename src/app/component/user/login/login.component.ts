import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../service/auth/auth.service";
import { NgForm } from "@angular/forms";
import { environment } from "../../../../environments/environment";

declare const FB: any;

@Component({
  selector: "oorsi-web-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  errors: Error[] = [];
  loading: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    FB.init({
      appId: environment.fbAppID,
      status: true,
      cookie: true,
      xfbml: true,
      version: "v2.4",
    });
  }

  onLogin(ngForm: NgForm) {
    if (ngForm.valid) {
      this.authService.login(ngForm.value.email, ngForm.value.password).then(
        (result) => {
          this.router.navigate(["/"]);
        },
        (err) => {
          console.log()
          this.errors = err;
        }
      );
    } else {
      this.errors = [
        {
          name: "Form Invalid",
          message: "Please enter username and password.",
        },
      ];
    }
  }

  onFacebookLoginClick() {
    FB.login(
      (response) => {
        console.log(response);
        if (response.status === "connected") {
          this.authService
            .facebookLogin(response.authResponse.accessToken)
            .then((data) => {
              if (data === true) {
                // login successful
                this.router.navigate(["/"]);
              } else {
                this.router.navigate(["/register"], {
                  queryParams: { fbat: response.authResponse.accessToken },
                });
              }
            })
            .catch((err) => location.reload);
        }
      },
      { scope: "email,public_profile,user_friends" }
    );
  }
}
