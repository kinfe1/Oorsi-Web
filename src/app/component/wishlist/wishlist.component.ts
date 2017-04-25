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

    loading: boolean = true;

    wishlistProducts: WishListProduct[] = []

    constructor(private wishlistService: WishlistService) { }

    ngOnInit() {
        this.wishlistService.getWishList()
            .subscribe(
            data => {
                this.wishlistProducts = data.json();
                this.loading = false;
            }

            )
    }

    onDeleteWishlistProduct(wishlistProduct: WishListProduct) {
        this.wishlistService.deleteWishListProduct(wishlistProduct).subscribe(data => this.wishlistProducts.splice(this.wishlistProducts.indexOf(wishlistProduct), 1));
    }


}
