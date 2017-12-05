import { Product } from '../../../../model/product';
import { Subscription } from "rxjs/Rx";
import { SubscriptionLog } from 'rxjs/testing/SubscriptionLog';
import { ProductService } from './../../../../service/product/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'oorsi-web-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

    products: Product[];

    private subscription: Subscription;

    constructor(private productService: ProductService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.subscription = this.route.queryParams.subscribe(
            (queryParam: any) => {
                this.productService.search(queryParam['s'])
                    .subscribe(
                    data => {
                        this.products = data;
                    }

                    )
            }
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }



}



// WEBPACK FOOTER //
// /Users/anegash/development/angular/oorsi-web/src/app/component/shop/product/product-list/product-list.component.ts