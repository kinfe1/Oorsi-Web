import { Card } from './../model/card';
import { OORSI_API_ENDPOINT } from '../const';


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class PaymentService {



  constructor(private authHttp: HttpClient) {

  }


  sendToken(token: string, setAsDefault: boolean): Observable<any> {
    return this.authHttp.post(OORSI_API_ENDPOINT + "payment/add", { token: token, setAsDefault: setAsDefault });
  }

  getAllPayments(): Observable<Card[]> {
    return this.authHttp.get<Card[]>(OORSI_API_ENDPOINT + 'payment/all');
  }

}
