import { AuthHttp } from 'angular2-jwt';
import { OORSI_API_ENDPOINT } from './../../const';
import { AuthService } from './../auth/auth.service';
import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { CartProduct } from '../../model/cartProduct';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CheckoutService {

    constructor(private http: AuthHttp) { }

    getCheckoutProducts(forUser?: number): Observable<CartProduct[]> {
        let headers: Headers = new Headers();
        return this.http.get(OORSI_API_ENDPOINT + 'checkout/products/' + forUser, { headers: headers }).map((response: Response) => response.json());
    }

}
