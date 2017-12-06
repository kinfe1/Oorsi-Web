import { AuthService } from './../auth/auth.service';
import { OORSI_API_ENDPOINT } from '../../const';
import { CartProduct } from '../../model/cartProduct';
import { Injectable, EventEmitter } from '@angular/core';


import { Product } from '../../model/product';
import { User } from '../../model/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpParams } from '@angular/common/http';


@Injectable()
export class CartService {

  cartUpdated: EventEmitter<number>;

  constructor(private http: HttpClient) {
    this.cartUpdated = new EventEmitter<number>();
  }

  getCart(): Observable<CartProduct[]> {

    return this.http.get<CartProduct[]>(OORSI_API_ENDPOINT + 'cart/products');
  }

  getCartSize(): Observable<number> {

    return this.http.get<number>(OORSI_API_ENDPOINT + 'cart/size');
  }

  updateCartSize(): void {
    this.getCartSize().subscribe(data => this.cartUpdated.emit(data));
  }

  deleteCartProduct(cartProduct: CartProduct): Promise<any> {

    let searchParams = new HttpParams();
    searchParams.set('forId', '' + cartProduct.forUser.userID);
    searchParams.set('productId', '' + cartProduct.product.productId);

    return new Promise<any>((resolve, reject) => {
      this.http.delete(OORSI_API_ENDPOINT + 'cart/remove', { params: searchParams }).subscribe(data => {
        console.log('CartProvider')
        this.updateCartSize();
        resolve(data)
      });
    });
  }

  addProductToCart(product: Product, to?: User) {

    let searchParams = new HttpParams();

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
      this.http.post(OORSI_API_ENDPOINT + 'cart/add', null, { params: searchParams }).subscribe(data => {
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
