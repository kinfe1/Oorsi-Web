import { AuthService } from '../../../service/auth/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-logout',
  template: ``,
  styles: []
})

export class LogoutComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

}
