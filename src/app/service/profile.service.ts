import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';
import { User } from '../model/user';
import { OORSI_API_ENDPOINT } from '../const';

@Injectable()
export class ProfileService {

  constructor(private authHttp: AuthHttp) { }

  getUserInfo(id: number): Observable<User> {
    return this.authHttp.get(OORSI_API_ENDPOINT + "p/" + id + "/info.json").map(data => data.json());
  }

}
