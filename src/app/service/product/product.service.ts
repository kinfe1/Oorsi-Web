import { OORSI_API_ENDPOINT } from './../../const';
import { Observable } from 'rxjs/Rx';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Product } from '../../model/product';

@Injectable()
export class ProductService {


    constructor(private http: Http) { }

    public search(s: string): Observable<any> {
        return this.http.get(OORSI_API_ENDPOINT + 'product/search?s=' + s + '&page=1');
    }

    public getProductById(id?: number): Observable<any> {
        return this.http.get(OORSI_API_ENDPOINT + 'product/id/' + id).map((response: Response) => response.json());
    }

    public getProductBySku(retailer: number, sku: string): Observable<any> {
        return this.http.get(OORSI_API_ENDPOINT + 'product/retailer/' + retailer + "/sku/" + sku).map((response: Response) => response.json());
    }

    public getProducts(products: Product[]): Observable<any> {
        let params: URLSearchParams = new URLSearchParams();

        for (let product of products) {
            params.append('sku', '' + product.sku);
        }

        return this.http.get(OORSI_API_ENDPOINT + 'product/list', { search: params });
    }




}
