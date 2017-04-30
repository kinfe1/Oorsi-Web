import { AuthHttp } from 'angular2-jwt';
import { Product } from './../model/product';
import { WishListProduct } from './../model/wishlistproduct';
import { AuthService } from './auth/auth.service';
import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { OORSI_API_ENDPOINT } from '../const';

@Injectable()
export class WishlistService {

    constructor(private http: AuthHttp) { }

    getWishList(): Observable<any> {
        return this.http.get(OORSI_API_ENDPOINT + 'wishlist/list.json');
    }

    deleteWishListProduct(wishlistProduct: WishListProduct): Observable<any> {

        let searchParams = new URLSearchParams();
        searchParams.set('productId', '' + wishlistProduct.product.productId);

        return this.http.delete(OORSI_API_ENDPOINT + 'wishlist/delete', { search: searchParams });
    }

    addProductToWishlist(product: Product) {


        let searchParams = new URLSearchParams();

        if (null != product.productId) {
            searchParams.set('productId', '' + product.productId);
        } else {
            searchParams.set('retailer', '' + product.retailerId);
            searchParams.set('sku', '' + product.sku);
        }

        return this.http.post(OORSI_API_ENDPOINT + 'wishlist/add', undefined, { search: searchParams }).map((response: Response) => response.json());
    }

    


}
