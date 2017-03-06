import { Card } from './../model/card';
import { OORSI_API_ENDPOINT } from '../const';
import { Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';



@Injectable()
export class PaymentService {



  constructor(private authHttp: AuthHttp) {

  }


  sendToken(token: string, setAsDefault: boolean): Observable<any> {
    return this.authHttp.post(OORSI_API_ENDPOINT + "payment/add", { token: token, setAsDefault: setAsDefault }).map((response: Response) => response.json());
  }

  getAllPayments(): Observable<Card[]> {
    return this.authHttp.get(OORSI_API_ENDPOINT + 'payment/all').map((response: Response) => response.json());
  }

}
