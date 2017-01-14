import { Product } from './../model/product';
import { WishListProduct } from './../model/wishlistproduct';
import { AuthService } from './auth/auth.service';
import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { OORSI_API_ENDPOINT } from '../const';

@Injectable()
export class WishlistService {

    constructor(private http: Http, private authService: AuthService) { }

    getWishList(): Observable<any> {
        let headers: Headers = new Headers();
        this.authService.addAuthHeader(headers);
        return this.http.get(OORSI_API_ENDPOINT + 'wishlist/json', { headers: headers });
    }

    deleteWishListProduct(wishlistProduct: WishListProduct): Observable<any> {
        let headers: Headers = new Headers();
        this.authService.addAuthHeader(headers);

        let searchParams = new URLSearchParams();
        searchParams.set('sku', '' + wishlistProduct.product.sku);

        return this.http.delete(OORSI_API_ENDPOINT + 'wishlist/delete', { headers: headers, search: searchParams });
    }

    addProductToWishlist(product: Product) {

        let headers: Headers = new Headers();
        this.authService.addAuthHeader(headers);

        let searchParams = new URLSearchParams();

        if (null != product.productId) {
            searchParams.set('productId', '' + product.productId);
        } else {
            searchParams.set('retailer', '' + product.retailerId);
            searchParams.set('sku', '' + product.sku);
        }

        return this.http.post(OORSI_API_ENDPOINT + 'wishlist/add', undefined, { headers: headers, search: searchParams }).map((response: Response) => response.json());


    }


}
