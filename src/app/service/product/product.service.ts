import { Observable } from 'rxjs/Rx';
import { Headers, Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Product } from '../../model/product';

@Injectable()
export class ProductService {


    constructor(private http: Http) { }

    public search(s: string): Observable<any> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('/oorsi-api/product/search?s=' + s + '&page=1', headers);
    }

    public getProduct(sku: string): Observable<any> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('/oorsi-api/product/sku/' + sku, headers);
    }




}
