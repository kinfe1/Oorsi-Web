import { CartService } from "./../../../../service/cart/cart.service";
import { WishlistService } from "../../../../service/wishlist.service";
import { Component, Input } from "@angular/core";
import { Product } from "../../../../model/product";
import { ADD_TO_CART, ADDED_TO_CART } from "../../../../const";
import { AuthService } from "../../../../service/auth/auth.service";

@Component({
  selector: "oorsi-web-product-item",
  templateUrl: "./product-item.component.html",
  styleUrls: ["./product-item.component.css"]
})
export class ProductItemComponent {

  /**
   * the product input it will display
   */
  @Input() product;

  /**
   * the index of the product in the parent list
   * to know the position of the product in the list
   */
  @Input() index: number;

  /**
   * products current status of added to card
   */
  isAddedToCart = false;

  /**
   * products current status of added to wishlist
   */
  isAddedToWishList = false;

  /**
   *
   * @param wishlistService used for adding the current product to wishlist
   * @param cartService used to add the current product to cart
   * @param authService used for checking errors in the responses of the requests
   */
  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  /**
   * action that adds the current product to users wish list
   */
  addToWishlist() {
    this.wishlistService.addProductToWishlist(this.product).subscribe(
      /** success - it is added to wishlist */
      data => {this.isAddedToWishList = true},
      /** error - to be checked by auth service */
      err => this.authService.checkError(err)
    );
  }

  /**
   * action that adds the current product to users cart
   */
  addToCart() {
    this.cartService.addProductToCart(this.product).then(
      /** success - it is added to cart */
      data => (this.isAddedToCart = true),
      /** error - to be checked by auth service */
      err => this.authService.checkError(err)
    );
  }
}
