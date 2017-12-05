import { OORSI_API_ENDPOINT } from './../../const';

import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../../model/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class FacebookService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  public getFBFriends(accessToken: string): Observable<User[]> {
    return this.http.get<User[]> (OORSI_API_ENDPOINT + 'friends/fb/search?accessToken=' + accessToken);

  }

}
