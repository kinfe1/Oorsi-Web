
import { Injectable } from '@angular/core';
import { OORSI_API_ENDPOINT } from '../../const';
import { Address } from '../../model/address';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class AddressService {

    constructor(private http: HttpClient) { }

    getAllAddresses(): Observable<Address[]> {
        return this.http.get<Address[]>(OORSI_API_ENDPOINT + 'address/all');
    }

    validateAddress(address: string): Observable<string> {
        let searchParams = new HttpParams();
        searchParams.append("address", address);
        return this.http.get<string>('https://maps.googleapis.com/maps/api/geocode/json', { params: searchParams });
    }

    saveAddress(address): Observable<Address> {
        return this.http.post<Address>(OORSI_API_ENDPOINT + 'address/save', address);
    }

}
