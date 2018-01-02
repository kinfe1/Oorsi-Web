
import { Product } from './../model/product';
import { WishListProduct } from './../model/wishlistproduct';
import { AuthService } from './auth/auth.service';
import { Injectable } from '@angular/core';

import { OORSI_API_ENDPOINT } from '../const';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class WishlistService {

    constructor(private http: HttpClient) { }

    getWishList(): Observable<any> {
        return this.http.get(OORSI_API_ENDPOINT + 'wishlist/list.json');
    }

    deleteWishListProduct(wishlistProduct: WishListProduct): Observable<any> {

        let searchParams = new HttpParams();
        searchParams.set('productId', '' + wishlistProduct.product.productId);

        return this.http.delete(OORSI_API_ENDPOINT + 'wishlist/delete', { params: searchParams });
    }

    addProductToWishlist(product: Product) {


        let searchParams = new HttpParams();

        if (null != product.productId) {
            searchParams.set('productId', '' + product.productId);
        } else {
            searchParams.set('retailer', '' + product.retailerId);
            searchParams.set('sku', '' + product.sku);
        }

        return this.http.post(OORSI_API_ENDPOINT + 'wishlist/add', undefined, { params: searchParams });
    }

    isInWishlist(product: Product): Observable<boolean> {
        let searchParams = new HttpParams();

        if (product.productId && null != product.productId) {
            searchParams.set('productId', '' + product.productId);
        } else {
            searchParams.set('retailer', '' + product.retailerId);
            searchParams.set('sku', '' + product.sku);
        }

        return this.http.get<boolean>(OORSI_API_ENDPOINT + 'wishlist/isInWishList', { params: searchParams });
    }





}
