import { WishListProduct } from './../../model/wishlistproduct';
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'oorsi-web-wishlist-item',
  templateUrl: './wishlist-item.component.html',
  styleUrls: ['./wishlist-item.component.css']
})
export class WishlistItemComponent implements OnInit {

  @Input() wishlistProduct: WishListProduct;

  @Output() onDeleteWishlistProduct = new EventEmitter<WishListProduct>();

  constructor() {
  }

  ngOnInit() {
  }

  onDelete(wishlistProduct: WishListProduct) {
    this.onDeleteWishlistProduct.emit(wishlistProduct);
  }



}
