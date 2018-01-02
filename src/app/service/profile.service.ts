import { Injectable } from '@angular/core';


import { User } from '../model/user';
import { OORSI_API_ENDPOINT } from '../const';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProfileService {

  constructor(private authHttp: HttpClient) { }

  getUserInfo(id: number): Observable<User> {
    return this.authHttp.get<User>(OORSI_API_ENDPOINT + "p/" + id + "/info.json");
  }

}
