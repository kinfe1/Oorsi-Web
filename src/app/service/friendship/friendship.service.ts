
import { AuthService } from './../auth/auth.service';

import { Injectable } from '@angular/core';
import { OORSI_API_ENDPOINT } from '../../const';
import { User } from '../../model/user';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FriendshipService {

    constructor(private authHttp: HttpClient) { }

    public search(s: string): Observable<User[]> {
        return this.authHttp.get<User[]>(OORSI_API_ENDPOINT + 'friends/search?s=' + s);
    }

    public getFriends(): Observable<User[]> {

        return this.authHttp.get<User[]>(OORSI_API_ENDPOINT + 'friends');

    }

    public follow(user: User) {
        return this.sendFollowUnfollowRequest(user, "friends/follow");
    }

    public unfollow(user: User) {
        return this.sendFollowUnfollowRequest(user, "friends/unfollow");
    }

    public sendFollowUnfollowRequest(user: User, url: string) {
        let searchParams = new HttpParams();
        searchParams.append("friendID", user.userID);
        return this.authHttp.post(OORSI_API_ENDPOINT + url, undefined, { params: searchParams });
    }
}
