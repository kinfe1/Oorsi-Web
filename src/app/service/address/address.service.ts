import { Address } from 'cluster';
import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Headers, Response, URLSearchParams, Http } from '@angular/http';
import { OORSI_API_ENDPOINT } from '../../const';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AddressService {

    constructor(private authHttp: AuthHttp, private http: Http) { }

    getAllAddresses(): Observable<Address[]> {
        return this.authHttp.get(OORSI_API_ENDPOINT + 'address/all').map((response: Response) => response.json());
    }

    validateAddress(address: string): Observable<string> {
        let searchParams = new URLSearchParams();
        searchParams.append("address", address);
        return this.http.get('https://maps.googleapis.com/maps/api/geocode/json', { search: searchParams }).map((response: Response) => response.json());
    }

    saveAddress(address): Observable<Address> {
        return this.authHttp.post(OORSI_API_ENDPOINT + 'address/save', address).map((response: Response) => response.json());
    }

}
