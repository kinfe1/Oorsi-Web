
import { Product } from './../model/product';
import { WishListProduct } from './../model/wishlistproduct';
import { AuthService } from './auth/auth.service';
import { Injectable, EventEmitter } from '@angular/core';

import { OORSI_API_ENDPOINT } from '../const';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class WishlistService {

    public wishlistAddedEvent: EventEmitter<WishListProduct>;

    constructor(private http: HttpClient) {
        this.wishlistAddedEvent = new EventEmitter()
    }

    getWishList(): Observable<any> {
        return this.http.get(OORSI_API_ENDPOINT + 'wishlist/list.json');
    }

    getWishlistItem(wishlistProductID: number): Observable<WishListProduct> {
        let searchParams = new HttpParams();
        searchParams.append('wishlistProductID', '' + wishlistProductID);
        return this.http.get<WishListProduct>(OORSI_API_ENDPOINT + 'wishlist', { params: searchParams });
    }

    deleteWishListProduct(wishlistProduct: WishListProduct): Observable<any> {
        return this.http.post(OORSI_API_ENDPOINT + 'wishlist/delete', wishlistProduct.product, { responseType: 'text' });
    }


    addProductToWishlist(product: Product) {
        return this.http.post(OORSI_API_ENDPOINT + 'wishlist/add', product);
    }

    addAmazonUrlToWishlist(url): Observable<WishListProduct> {
        return this.http.post<WishListProduct>(OORSI_API_ENDPOINT + 'wishlist/amazon/add', url);
    }

    isInWishlist(product: Product): Observable<boolean> {
        let searchParams = new HttpParams({ 'fromString': '' + product.productId });

        if (product.productId && null != product.productId) {
            searchParams.set('productId', '' + product.productId);
        } else {
            searchParams.set('retailer', '' + product.retailerId);
            searchParams.set('sku', '' + product.sku);
        }

        return this.http.get<boolean>(OORSI_API_ENDPOINT + 'wishlist/isInWishList', { params: searchParams });
    }



}
