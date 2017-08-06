import { AuthService } from './../../service/auth/auth.service';
import { WishListProduct } from './../../model/wishlistproduct';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { WishlistService } from '../../service/wishlist.service';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'oorsi-web-wishlist',
    templateUrl: './wishlist.component.html',
    styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

    loading: boolean = true;

    wishlistProducts: WishListProduct[] = []

    constructor(private wishlistService: WishlistService, private authService: AuthService, private titleService: Title) { }

    ngOnInit() {
        this.wishlistService.getWishList()
            .subscribe(
            data => {
                this.wishlistProducts = data.json();
                this.loading = false;
            }

            )

        // this.titleService.setTitle(this.titleService.getTitle() + ": Wishlist");
    }

    onDeleteWishlistProduct(wishlistProduct: WishListProduct) {
        this.wishlistService.deleteWishListProduct(wishlistProduct).subscribe(data => this.wishlistProducts.splice(this.wishlistProducts.indexOf(wishlistProduct), 1), err => this.authService.checkError(err));
    }


}
