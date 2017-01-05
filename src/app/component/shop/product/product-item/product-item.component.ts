import { CartService } from './../../../../service/cart/cart.service';
import { WishlistService } from '../../../../service/wishlist.service';
import { ProductService } from './../../../../service/product/product.service';
import { Component, Input } from '@angular/core';
import { Product } from '../../../../model/product';
import { ADD_TO_CART, ADDED_TO_CART } from '../../../../const';

@Component({
  selector: 'oorsi-web-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {

  @Input() product;

  @Input() index: number;

  addToCartButton = ADD_TO_CART;

  constructor(private wishlistService: WishlistService, private cartService: CartService) { }

  addToWishlist(product: Product) {
    this.wishlistService.addProductToWishlist(product);
  }

  addToCart(product: Product) {
    this.cartService.addProductToCart(product).subscribe(data => this.addToCartButton = ADDED_TO_CART);
  }


}
