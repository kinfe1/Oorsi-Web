import { WishListProduct } from './../../model/wishlistproduct';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { WishlistService } from '../../service/wishlist.service';

@Component({
    selector: 'oorsi-web-wishlist',
    templateUrl: './wishlist.component.html',
    styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

    products: Product[] = []

    wishlistProducts: WishListProduct[] = []

    constructor(private wishlistService: WishlistService) { }

    ngOnInit() {
       
        this.wishlistService.getWishList()
            .subscribe(
            data => {
                this.wishlistProducts = data.json();
            }

            )
    }


}
