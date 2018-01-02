

import { Injectable } from '@angular/core';
import { OORSI_API_ENDPOINT } from '../const';
import { Order } from '../model/order';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OrderService {

  constructor(private http: HttpClient) { }


  getOrder(orderID: number): Observable<any> {
    return this.http.get(OORSI_API_ENDPOINT + 'order/id/' + orderID);
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(OORSI_API_ENDPOINT + 'order/all');
  }

}
