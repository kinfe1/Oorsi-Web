import { Address } from 'cluster';
import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Headers, Response } from '@angular/http';
import { OORSI_API_ENDPOINT } from '../../const';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AddressService {

  constructor(private http: AuthHttp) { }

  getAllAddresses(): Observable<Address[]> {
    return this.http.get(OORSI_API_ENDPOINT + 'address/all').map((response: Response) => response.json());
  }

}
