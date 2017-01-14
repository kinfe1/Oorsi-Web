import { User } from './../../../model/user';
import { Subscription } from 'rxjs/Rx';
import { AuthService } from './../../../service/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'oorsi-web-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  user: User;
  fbat: string;

  error: string;
  loading: boolean;

  private subscription: Subscription;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.route.queryParams.subscribe(
      (queryParam: any) => {
        if (queryParam['fbat'] === undefined || queryParam['fbat'] === null) {

        }
        else {
          this.authService.getFBUserInfo(queryParam['fbat']).subscribe(user => {
            this.user = user;
            this.fbat = queryParam['fbat'];
          });
        }

      }

    );

  }

  onSubmit(ngForm: NgForm) {
    this.authService.register(ngForm.value).subscribe(result => {
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

}
