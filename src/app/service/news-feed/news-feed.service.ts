import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { OORSI_API_ENDPOINT } from '../../const';

@Injectable()
export class NewsFeedService {

  constructor(private authHttp: AuthHttp) { }

  getNewsFeed(): Observable<any> {
    return this.authHttp.get(OORSI_API_ENDPOINT + 'news/json', { withCredentials: true });
  }



}
