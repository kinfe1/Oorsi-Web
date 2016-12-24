import { WishListProduct } from './../../model/wishlistproduct';
import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'oorsi-web-wishlist-item',
  templateUrl: './wishlist-item.component.html',
  styleUrls: ['./wishlist-item.component.css']
})
export class WishlistItemComponent implements OnInit, OnChanges {

  @Input() wishlistProduct: WishListProduct = { product: { name: "Abebe beso bela" } };

  test: string = "This works";

  constructor() {

    this.wishlistProduct = { product: { name: "Abebe beso bela" } }
  }

  ngOnInit() {
    console.log(this.wishlistProduct.product.largeImage);
  }

  ngOnChanges() {
    console.log(this.wishlistProduct.product.name);
  }

}
