import { OORSI_API_ENDPOINT } from './../../const';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../../model/user';

@Injectable()
export class FacebookService {

  constructor(private http: Http, private authService: AuthService) { }

  public getFBFriends(): Observable<User[]> {

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.authService.addAuthHeader(headers);
    return this.http.get(OORSI_API_ENDPOINT + 'friends/fb', { headers: headers }).map((response: Response) => response.json());

  }

}
