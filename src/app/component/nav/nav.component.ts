import { environment } from './../../../environments/environment';
import { AuthService } from './../../service/auth/auth.service';
import { Component, OnChanges, OnInit, EventEmitter } from '@angular/core';
import { CartService } from '../../service/cart/cart.service';

// declare const FB: any;

@Component({
  selector: 'oorsi-web-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  cartSize: number;
  cartUpdatedEmmiter: EventEmitter<number>;

  loggedIn = false;

  environment;


  constructor(private authService: AuthService, private cartService: CartService) {
    // FB.init({
    //   appId: environment.fbAppID,
    //   cookie: false,  // enable cookies to allow the server to access
    //   // the session
    //   xfbml: true,  // parse social plugins on this page
    //   version: 'v2.5' // use graph api version 2.5
    // });
    this.cartUpdatedEmmiter = this.cartService.cartUpdated;

    if (environment.production !== true) {
      this.environment = environment.env;
    }
  }



  ngOnInit() {
    this.loggedIn = this.authService.isLoggedIn();
    this.authService.isLoggedInEmitter.subscribe(i => {
      this.loggedIn = i;
    });
    this.cartService.getCartSize().subscribe(data => {
      console.log('getCartSize cart size:' + data);
      this.cartSize = data;
    });
    this.cartUpdatedEmmiter.subscribe(data => {
      console.log('cartUpdatedEmmiter cart size:' + data);
      this.cartSize = data;
    });
  }

  // ngOnChanges() {
  //   if (this.loggedIn) {
  //     this.cartService.getCartSize().subscribe(data => this.cartSize = data, err => this.authService.checkError(err));
  //   }
  // }




}
