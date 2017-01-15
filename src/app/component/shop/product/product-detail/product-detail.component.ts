import { WishlistService } from '../../../../service/wishlist.service';
import { ADDED_TO_CART, ADD_TO_CART } from './../../../../const';
import { CartService } from './../../../../service/cart/cart.service';
import { ProductService } from './../../../../service/product/product.service';
import { Subscription } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../model/product';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'oorsi-web-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

    product: Product;

    addToCartButton: string = ADD_TO_CART;

    private subscription: Subscription;

    constructor(private route: ActivatedRoute, private productService: ProductService, private cartService: CartService, private wishlistService: WishlistService) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(
            (param: any) => {
                if (param['id'] != undefined) {
                    this.productService.getProductById(param['id'])
                        .subscribe(
                        data => {
                            this.product = data;
                            console.log(this.product);
                            this.loadRelatedProducts();
                        }
                        )
                }
                else {
                    this.productService.getProductBySku(param['retailer'], param['sku'])
                        .subscribe(
                        data => {
                            this.product = data;
                            console.log(this.product);
                            this.loadRelatedProducts();
                        }
                        )
                }
            }
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    private loadRelatedProducts() {
        console.log("loadRelatedProducts");
        if (this.product) {
            if (null != this.product.frequentlyPurchasedWith && this.product.frequentlyPurchasedWith.length > 0)
                this.productService.getProducts(this.product.frequentlyPurchasedWith).subscribe(data => this.product.frequentlyPurchasedWith = data.json());
            if (null != this.product.relatedProducts && this.product.relatedProducts.length > 0)
                this.productService.getProducts(this.product.relatedProducts).subscribe(data => this.product.relatedProducts = data.json());
        }

    }

    addToCart(product: Product) {
        this.cartService.addProductToCart(product).subscribe(data => this.addToCartButton = ADDED_TO_CART);
    }

    addToWishlist(product: Product) {
        this.wishlistService.addProductToWishlist(product).subscribe(data => this.addToCartButton = ADDED_TO_CART);
    }
}


