import { Observable } from 'rxjs/Rx';
import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { OORSI_API_ENDPOINT } from '../const';
import { Response } from '@angular/http';
import { Order } from '../model/order';

@Injectable()
export class OrderService {

  constructor(private authHttp: AuthHttp) { }


  getOrder(orderID: number): Observable<any> {
    return this.authHttp.get(OORSI_API_ENDPOINT + 'order/id/' + orderID).map((response: Response) => response.json());
  }

  getAllOrders(): Observable<Order[]> {
    return this.authHttp.get(OORSI_API_ENDPOINT + 'order/all').map((response: Response) => response.json());
  }

}
