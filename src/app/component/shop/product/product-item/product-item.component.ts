import { CartService } from './../../../../service/cart/cart.service';
import { WishlistService } from '../../../../service/wishlist.service';
import { ProductService } from './../../../../service/product/product.service';
import { Component, Input } from '@angular/core';
import { Product } from '../../../../model/product';
import { ADD_TO_CART, ADDED_TO_CART } from '../../../../const';
import { AuthService } from '../../../../service/auth/auth.service';

@Component({
  selector: 'oorsi-web-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {

  @Input() product;

  @Input() index: number;

  addToCartButton = ADD_TO_CART;

  constructor(private wishlistService: WishlistService, private cartService: CartService, private authService: AuthService) { }

  addToWishlist(product: Product) {
    this.wishlistService.addProductToWishlist(product).subscribe(data => { }, err => this.authService.checkError(err));
  }

  addToCart(product: Product) {
    this.cartService.addProductToCart(product).then(data => this.addToCartButton = ADDED_TO_CART, err => this.authService.checkError(err));
  }


}
