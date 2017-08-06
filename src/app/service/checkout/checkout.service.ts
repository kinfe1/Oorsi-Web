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
        return this.http.get(OORSI_API_ENDPOINT + 'checkout/products/' + forUser).map((response: Response) => response.json());
    }

    submitOrder(forUser: string, shipTo: number, shippingAddress: number, paymentMethod: string): Observable<any> {
        return this.http.post(OORSI_API_ENDPOINT + 'order/submit',
            {
                forUser: forUser,
                shipTo: shipTo,
                shippingAddress: shippingAddress,
                paymentMethod: paymentMethod
            }
        ).map((response: Response) => response.json());
    }



}
