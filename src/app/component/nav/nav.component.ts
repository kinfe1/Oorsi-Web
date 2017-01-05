import { AuthService } from './../../service/auth/auth.service';
import { Component, OnChanges, OnInit } from '@angular/core';
import { CartService } from '../../service/cart/cart.service';

@Component({
  selector: 'oorsi-web-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnChanges {

  cartSize: number = 0;


  constructor(private authService: AuthService, private cartService: CartService) {

  }

  loggedIn: boolean = false;

  ngOnInit() {
    this.loggedIn = this.authService.canActivate();
    this.authService.isLoggedIn.subscribe(i => {
      this.loggedIn = i;
    })
  }

  ngOnChanges() {
    if (this.loggedIn) {
      this.cartService.getCartSize().subscribe(data => this.cartSize = data);
    }
  }




}
