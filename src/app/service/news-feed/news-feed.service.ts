import { Observable } from 'rxjs/Rx';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { OORSI_API_ENDPOINT } from '../../const';

@Injectable()
export class NewsFeedService {

  constructor(private http: Http, private authService: AuthService) { }

  getNewsFeed(): Observable<any> {
    let headers: Headers = new Headers();
    this.authService.addAuthHeader(headers);
    return this.http.get(OORSI_API_ENDPOINT + 'news/json', { headers: headers });
  }



}
