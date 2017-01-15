import { ADDED_TO_CART } from './../../const';
import { Product } from './../../model/product';
import { WishListProduct } from './../../model/wishlistproduct';
import { Component, Input, Output, OnInit, EventEmitter, OnChanges } from '@angular/core';
import { CartService } from '../../service/cart/cart.service';
import { ADD_TO_CART } from '../../const';

@Component({
  selector: 'oorsi-web-wishlist-item',
  templateUrl: './wishlist-item.component.html',
  styleUrls: ['./wishlist-item.component.css']
})
export class WishlistItemComponent implements OnInit, OnChanges {

  addToCartButton: string = ADD_TO_CART;

  @Input() wishlistProduct: WishListProduct;

  @Output() onDeleteWishlistProduct = new EventEmitter<WishListProduct>();

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log(this.wishlistProduct);
  }

  onDelete(wishlistProduct: WishListProduct) {
    this.onDeleteWishlistProduct.emit(wishlistProduct);
  }

  addToCart(product: Product) {
    this.cartService.addProductToCart(product).subscribe(data => this.addToCartButton = ADDED_TO_CART);
  }



}
