import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth/auth.service';
import { NgForm } from '@angular/forms/src/directives';

@Component({
  selector: 'oorsi-web-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: string;
  loading: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onLogin(ngForm: NgForm) {

    this.authService.login(ngForm.value.email, ngForm.value.password).subscribe(result => {
       console.log(result);
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
