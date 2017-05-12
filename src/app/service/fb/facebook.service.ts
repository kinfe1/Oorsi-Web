import { OORSI_API_ENDPOINT } from './../../const';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../../model/user';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class FacebookService {

  constructor(private http: AuthHttp, private authService: AuthService) { }

  public getFBFriends(accessToken: string): Observable<User[]> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.authService.addAuthHeader(headers);
    return this.http.get(OORSI_API_ENDPOINT + 'friends/fb/search?accessToken=' + accessToken, { headers: headers }).map((response: Response) => response.json());

  }

}
