import { User } from "./../../../../model/user";
import { ProfileService } from "../../../../service/profile.service";
import { WishlistService } from "../../../../service/wishlist.service";
import { ADDED_TO_CART, ADD_TO_CART } from "./../../../../const";
import { CartService } from "./../../../../service/cart/cart.service";
import { ProductService } from "./../../../../service/product/product.service";
import { Subscription } from "rxjs/Rx";
import { Component, OnInit } from "@angular/core";
import { Product } from "../../../../model/product";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../../../../service/auth/auth.service";

@Component({
  selector: "oorsi-web-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.css"]
})
export class ProductDetailComponent implements OnInit {
  /**
   * the current product that is to be shown
   */
  product: Product;

  /**
   * the user that might be receiving the product as gift
   */
  forUser: User;

  /**
   *  indicates if this product is added to users personal cart
   */
  isAddedToPersonalCart = false;

  /**
   * indicates if this product is added to user's friend cart
   */
  isAddedToFriendCard = false;

  /**
   * indicates if this product is added to users wishlist
   */
  isAddedToWishlist = false;

  /**
   * product count holder
   */
  count = 0;

  /**
   * param subscription to unsubscribe later
   */
  private paramSubscription: Subscription;

  /**
   * query param subscription to unsubscribe later
   */
  private queryParamSubscription: Subscription;

  /**
   *
   * @param route
   * @param productService
   * @param cartService
   * @param wishlistService
   * @param profileService
   * @param authService
   */
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private profileService: ProfileService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    /**
     * from route path params we get product id or retailer and sku
     */
    this.paramSubscription = this.route.params.subscribe((param: any) => {
      if (param["id"] != undefined) {
        /** if we get id
         * we fetch product detail with id */
        this.productService
          .getProductById(param["id"])
          .subscribe(this.receiveProduct.bind(this));
      } else {
        /** if we get retailer and sku number
         * we fetch using those values */
        this.productService
          .getProductBySku(param["retailer"], param["sku"])
          .subscribe(this.receiveProduct.bind(this));
      }
    });

    /** get query params to get the receiver of the product selected */
    this.queryParamSubscription = this.route.queryParams.subscribe(params => {
      /** if for param is available */
      if (params["for"] != undefined) {
        /** get user details using the users id found in params.for */
        this.profileService.getUserInfo(params["for"]).subscribe(
          data => {
            /** pass received user data to forUser property */
            this.forUser = data;
          },
          /** pass to auth service if error occures */
          err => this.authService.checkError(err)
        );
      }
    });
  }

  /**
   * This method will receive product and place it in the component for display
   * then it will request for similar products based on the received product
   * @param product the product received from services
   */
  private receiveProduct(product) {
    /** pass the received product data to the display product propery */
    this.product = product;
    /** initiate a load of related products list */
    this.loadRelatedProducts();
  }

  ngOnDestroy() {
    /** cleanup param subscriptions by unsubscribing from them */
    this.paramSubscription.unsubscribe();
    this.queryParamSubscription.unsubscribe();
  }

  /**
   * loads related products to the current product and puts them in
   * the product property child properties .frequentlyPurchasedWith
   * and .relatedProducts
   */
  private loadRelatedProducts() {
    /** check product is properly loaded */
    if (this.product) {
      /** TODO: this algorithm should be in the backend app */
      if (
        null != this.product.frequentlyPurchasedWith &&
        this.product.frequentlyPurchasedWith.length > 0
      )
        this.productService
          .getProducts(this.product.frequentlyPurchasedWith)
          .subscribe(data => (this.product.frequentlyPurchasedWith = data));
      if (
        null != this.product.relatedProducts &&
        this.product.relatedProducts.length > 0
      )
        this.productService
          .getProducts(this.product.relatedProducts)
          .subscribe(data => (this.product.relatedProducts = data));
    }
  }

  /**
   * action to add current product to the users personal cart
   */
  addToCart() {
    this.cartService.addProductToCart(this.product).then(
      data => (this.isAddedToPersonalCart = true),
      err => this.authService.checkError(err)
    );
  }

  /**
   * action to add current product to the user's friend gift cart
   */
  addToCartForUser() {
    this.cartService.addProductToCart(this.product, this.forUser).then(
      data => (this.isAddedToFriendCard = true),
      err => this.authService.checkError(err)
    );
  }

  /**
   * action to add current product to the users wishlist
   */
  addToWishlist() {
    this.wishlistService.addProductToWishlist(this.product).subscribe(
      data => (this.isAddedToWishlist = true),
      err => this.authService.checkError(err)
    );
  }

  /**
   * change product count with given number
   */
  actionChangeProductCount(dif) {
    // non negative value check when decreased
    if(this.count == 0 && dif == -1) {
      return
    }
    // change value
    this.count+=dif;
  }
}
