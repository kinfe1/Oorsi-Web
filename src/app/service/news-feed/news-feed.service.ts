

import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { OORSI_API_ENDPOINT } from '../../const';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NewsFeedService {

  constructor(private authHttp: HttpClient) { }

  getNewsFeed(): Observable<any> {
    return this.authHttp.get(OORSI_API_ENDPOINT + 'news/json', { withCredentials: true });
  }



}
