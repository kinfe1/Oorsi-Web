import { CartProduct } from '../../model/cartProduct';
import { CartService } from './../../service/cart/cart.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';

@Component({
  selector: 'oorsi-web-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  users: User[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.getCart().subscribe(data => {
      let cartProducts: CartProduct[] = data;
      for (let cartProduct of cartProducts) {
        let added: boolean = false;
        for (let user of this.users) {
          if (cartProduct.forUser.userID === user.userID) {
            user.cartProducts.push(cartProduct);
            added = true;
            break;
          }
        }

        if (!added) {
          let user: User = new User(cartProduct.forUser);
          user.cartProducts.push(cartProduct);
          this.users.push(user);
        }

      }
    });

  }

  onDeleteCartProduct(cartProduct: CartProduct) {
    this.cartService.deleteCartProduct(cartProduct).subscribe(data => {
      for (let user of this.users) {
        user.cartProducts.splice(user.cartProducts.indexOf(cartProduct), 1);
      }
    });
  }

}
