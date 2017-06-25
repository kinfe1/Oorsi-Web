import { User } from '../../model/user';
import { ADDED_TO_CART } from './../../const';
import { Product } from './../../model/product';
import { WishListProduct } from './../../model/wishlistproduct';
import { Component, Input, Output, OnInit, EventEmitter, OnChanges } from '@angular/core';
import { CartService } from '../../service/cart/cart.service';
import { ADD_TO_CART } from '../../const';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'oorsi-web-wishlist-item',
  templateUrl: './wishlist-item.component.html',
  styleUrls: ['./wishlist-item.component.css']
})
export class WishlistItemComponent implements OnInit {

  addToCartButton: string = ADD_TO_CART;

  @Input() canDelete: boolean = false;

  @Input() wishlistProduct: WishListProduct;

  @Output() onDeleteWishlistProduct = new EventEmitter<WishListProduct>();

  constructor(private cartService: CartService, private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
  }


  onDelete(wishlistProduct: WishListProduct) {
    this.onDeleteWishlistProduct.emit(wishlistProduct);
  }

  addToCart(product: Product, user: User) {
    this.cartService.addProductToCart(product, user).then(data => this.addToCartButton = ADDED_TO_CART, err => this.authService.checkError(err));
  }


  viewProduct() {
    let queryParams = {};
    if (this.wishlistProduct.user) {
      queryParams['for'] = this.wishlistProduct.user.userID;
    }
    this.router.navigate(['shop/id', this.wishlistProduct.product.productId], { queryParams: queryParams });
  }



}
