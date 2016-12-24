import { AuthService } from './../../service/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'oorsi-web-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {


  constructor(private authService: AuthService) {

  }

  loggedIn: boolean = false;

  ngOnInit() {
    this.loggedIn = this.authService.canActivate();
    console.log('NavComponent.ngOnInit');
    this.authService.isLoggedIn.subscribe(i => {
      console.log("eventemmiter " + i)
      this.loggedIn = i;
    })
  }




}
