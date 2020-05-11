import { User } from './../../../model/user';
import { Subscription } from 'rxjs/Rx';
import { AuthService } from './../../../service/auth/auth.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Error } from '../../../model/error';
import { environment } from '../../../../environments/environment';
import { MustMatch } from './confirm.validator';

declare const FB: any;

@Component({
  selector: 'oorsi-web-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  myForm: FormGroup;

  submitAttempt: boolean = false;

  registerPageEmitter: EventEmitter<any>;

  private subscription: Subscription;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.myForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required]],
      birthDate: [],
      fbat: []
    }, {
      validator:MustMatch('password' , 'confirm_password')
    });

    this.subscription = this.route.queryParams.subscribe(
      (queryParam: any) => {
        if (queryParam['fbat'] === undefined || queryParam['fbat'] === null) {

        }
        else {
          this.authService.getFBUserInfo(queryParam['fbat']).subscribe(user => {
            this.myForm.patchValue({
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              fbat: queryParam['fbat']
            });
          });
        }

      }

    );

    FB.init({
      appId: environment.fbAppID,
      status: true,
      cookie: true,
      xfbml: true,
      version: 'v2.4'
    });

  }

  register() {

    this.submitAttempt = true;
    if (this.myForm.valid) {
      this.authService.register(this.myForm.value).then(
        result => { this.router.navigate(['/news']) },
        err => {
          let errors: Error[] = err;
          for (let error of errors) {
            if (this.myForm.controls[error.fieldName]) {
              this.myForm.controls[error.fieldName].setErrors({ remote: error.message });
            }
          }
        });
    } else {
    }
  }



  onFacebookLoginClick() {
    FB.login(response => {
      console.log(response);
      if (response.status === 'connected') {
        this.authService.facebookLogin(response.authResponse.accessToken).then(
          data => {
            if (data === true) {
              // login successful
              this.router.navigate(['/']);
            } else {
              this.authService.getFBUserInfo(response.authResponse.accessToken).subscribe(user => {
                this.myForm.patchValue({
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email,
                  fbat: response.authResponse.accessToken
                });
              });
            }
          }).catch(err => location.reload);
      }
    }, { scope: 'email,public_profile,user_friends' });
  }
}

