import { AuthHttp } from 'angular2-jwt';
import { AuthService } from './../auth/auth.service';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { OORSI_API_ENDPOINT } from '../../const';
import { User } from '../../model/user';

@Injectable()
export class FriendshipService {

  constructor(private http: Http, private authService: AuthService) { }

  public search(s: string): Observable<User[]> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.authService.addAuthHeader(headers);
    return this.http.get(OORSI_API_ENDPOINT + 'friends/search?s=' + s, { headers: headers }).map((response: Response) => response.json());
  }

}
