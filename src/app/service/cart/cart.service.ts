import { AuthService } from './../auth/auth.service';
import { OORSI_API_ENDPOINT } from '../../const';
import { CartProduct } from '../../model/cartProduct';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Product } from '../../model/product';
import { User } from '../../model/user';

@Injectable()
export class CartService {

  constructor(private http: Http, private authService: AuthService) { }

  getCart(): Observable<CartProduct[]> {
    let headers: Headers = new Headers();
    this.authService.addAuthHeader(headers);

    return this.http.get(OORSI_API_ENDPOINT + 'cart/products', { headers: headers }).map((response: Response) => response.json());
  }

  getCartSize(): Observable<number> {
    let headers: Headers = new Headers();
    this.authService.addAuthHeader(headers);

    return this.http.get(OORSI_API_ENDPOINT + 'cart/size', { headers: headers }).map((response: Response) => response.json());
  }

  deleteCartProduct(cartProduct: CartProduct): Observable<any> {
    let headers: Headers = new Headers();
    this.authService.addAuthHeader(headers);

    let searchParams = new URLSearchParams();
    searchParams.set('forId', '' + cartProduct.forUser.userID);
    searchParams.set('productId', '' + cartProduct.product.productId);

    return this.http.delete(OORSI_API_ENDPOINT + 'cart/remove', { headers: headers, search: searchParams });
  }

  addProductToCart(product: Product, to?: User) {
    let headers: Headers = new Headers();
    this.authService.addAuthHeader(headers);

    let searchParams = new URLSearchParams();

    if (null != product.productId) {
      searchParams.set('productId', '' + product.productId);
    } else {
      searchParams.set('retailer', '' + product.retailerId);
      searchParams.set('sku', '' + product.sku);
    }

    if (to) {
      searchParams.set('to', '' + to.userID);
    }

    return this.http.post(OORSI_API_ENDPOINT + 'cart/add', undefined, { headers: headers, search: searchParams }).map((response: Response) => response.json());
  }


}
