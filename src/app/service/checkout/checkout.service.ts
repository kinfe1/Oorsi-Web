
import { OORSI_API_ENDPOINT } from './../../const';
import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { CartProduct } from '../../model/cartProduct';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class CheckoutService {

    constructor(private http: HttpClient) { }

    getCheckoutProducts(forUser?: number): Observable<CartProduct[]> {
        return this.http.get<CartProduct[]>(OORSI_API_ENDPOINT + 'checkout/products/' + forUser);
    }

    submitOrder(forUser: string, shipTo: number, shippingAddress: number, paymentMethod: string): Observable<any> {
        return this.http.post(OORSI_API_ENDPOINT + 'order/submit',
            {
                forUser: forUser,
                shipTo: shipTo,
                shippingAddress: shippingAddress,
                paymentMethod: paymentMethod
            }
        );
    }



}
