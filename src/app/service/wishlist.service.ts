import { AuthService } from './auth/auth.service';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class WishlistService {

  constructor(private http: Http, private authService: AuthService) { }

  getWishList(): Observable<any> {
    return this.http.get('/oorsi-api/wishlist/json', [this.authService.getAuthHeader()]);
  }


}
