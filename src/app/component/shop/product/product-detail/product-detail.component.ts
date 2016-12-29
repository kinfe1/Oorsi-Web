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

    private subscription: Subscription;

    constructor(private route: ActivatedRoute, private productService: ProductService) {

        this.subscription = this.route.params.subscribe(
            (param: any) => {
                this.productService.getProduct(param['sku'])
                    .subscribe(
                    data => {
                        this.product = data.json();
                        this.loadRelatedProducts();
                    }
                    )
            }
        );
    }

    ngOnInit() {


    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    private loadRelatedProducts() {
        if (this.product) {
            if (this.product.frequentlyPurchasedWith.length > 0)
                this.productService.getProducts(this.product.frequentlyPurchasedWith).subscribe(data => this.product.frequentlyPurchasedWith = data.json());
            if (this.product.relatedProducts.length > 0)
                this.productService.getProducts(this.product.relatedProducts).subscribe(data => this.product.relatedProducts = data.json());
        }

    }

}
