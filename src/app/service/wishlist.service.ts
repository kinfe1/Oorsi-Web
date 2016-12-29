import { WishListProduct } from './../model/wishlistproduct';
import { AuthService } from './auth/auth.service';
import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
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


}
