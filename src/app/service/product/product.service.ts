import { OORSI_API_ENDPOINT } from './../../const';

import { Injectable } from '@angular/core';
import { Product } from '../../model/product';
import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductService {


    constructor(private http: HttpClient) { }

    public search(s: string): Observable<any> {

        return this.http.get(OORSI_API_ENDPOINT + 'product/search?s=' + s + '&page=1');
    }

    public getProductById(id?: number): Observable<any> {
        // let headers = new Headers();
        // headers.append('Content-Type', 'application/json');

        return this.http.get(OORSI_API_ENDPOINT + 'product/id/' + id);
    }

    public getProductBySku(retailer: number, sku: string): Observable<any> {
        // var headers = new Headers();
        // headers.append('Content-Type', 'application/json');

        return this.http.get(OORSI_API_ENDPOINT + 'product/retailer/' + retailer + "/sku/" + sku);
    }

    public getProducts(products: Product[]): Observable<any> {
        let params: HttpParams = new HttpParams();

        for (let product of products) {
            params.set('sku', '' + product.sku);
        }

        return this.http.get(OORSI_API_ENDPOINT + 'product/list', { params: params });
    }

    public trendingProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(OORSI_API_ENDPOINT + 'product/trending');
    }



}
