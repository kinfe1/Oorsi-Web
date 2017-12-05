import { AuthService } from './../auth/auth.service';
import { OORSI_API_ENDPOINT } from '../../const';
import { CartProduct } from '../../model/cartProduct';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Product } from '../../model/product';
import { User } from '../../model/user';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class CartService {

  cartUpdated: EventEmitter<number>;

  constructor(private http: AuthHttp) {
    this.cartUpdated = new EventEmitter<number>();
  }

  getCart(): Observable<CartProduct[]> {

    return this.http.get(OORSI_API_ENDPOINT + 'cart/products').map((response: Response) => response.json());
  }

  getCartSize(): Observable<number> {

    return this.http.get(OORSI_API_ENDPOINT + 'cart/size').map((response: Response) => response.json());
  }

  updateCartSize(): void {
    this.getCartSize().subscribe(data => this.cartUpdated.emit(data));
  }

  deleteCartProduct(cartProduct: CartProduct): Promise<any> {

    let searchParams = new URLSearchParams();
    searchParams.set('forId', '' + cartProduct.forUser.userID);
    searchParams.set('productId', '' + cartProduct.product.productId);

    return new Promise<any>((resolve, reject) => {
      this.http.delete(OORSI_API_ENDPOINT + 'cart/remove', { search: searchParams }).subscribe(data => {
        console.log('CartProvider')
        this.updateCartSize();
        resolve(data)
      });
    });
  }

  addProductToCart(product: Product, to?: User) {

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

    return new Promise<any>((resolve, reject) => {
      this.http.post(OORSI_API_ENDPOINT + 'cart/add', null, { search: searchParams }).map(
        (response: Response) => {
          response.json()
        }).subscribe(data => {
          this.updateCartSize();
          resolve(data);
        })
    });
  }

  updateCartProduct(item: CartProduct): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.post(OORSI_API_ENDPOINT + 'cart/product/update', item).subscribe(data => {
        this.updateCartSize();
        resolve(data);
      });
    })
  }
}
