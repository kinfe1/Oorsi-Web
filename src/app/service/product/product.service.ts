import { OORSI_API_ENDPOINT } from './../../const';
import { Observable } from 'rxjs/Rx';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Product } from '../../model/product';

@Injectable()
export class ProductService {


    constructor(private http: Http) { }

    public search(s: string): Observable<any> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get(OORSI_API_ENDPOINT + 'product/search?s=' + s + '&page=1', headers);
    }

    public getProduct(sku: string): Observable<any> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get(OORSI_API_ENDPOINT + 'product/sku/' + sku, headers).map((response: Response) => response.json());
    }

    public getProducts(products: Product[]): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let params: URLSearchParams = new URLSearchParams();

        for (let product of products) {
            params.append('sku', '' + product.sku);
        }

        return this.http.get(OORSI_API_ENDPOINT + 'product/list', { headers: headers, search: params });
    }




}
