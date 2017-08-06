import { AuthHttp } from 'angular2-jwt';
import { AuthService } from './../auth/auth.service';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { OORSI_API_ENDPOINT } from '../../const';
import { User } from '../../model/user';

@Injectable()
export class FriendshipService {

    constructor(private authHttp: AuthHttp) { }

    public search(s: string): Observable<User[]> {
        return this.authHttp.get(OORSI_API_ENDPOINT + 'friends/search?s=' + s).map((response: Response) => response.json());
    }

    public getFriends(): Observable<User[]> {

        return this.authHttp.get(OORSI_API_ENDPOINT + 'friends').map((response: Response) => response.json());

    }

    public follow(user: User) {
        return this.sendFollowUnfollowRequest(user, "friends/follow");
    }

    public unfollow(user: User) {
        return this.sendFollowUnfollowRequest(user, "friends/unfollow");
    }

    public sendFollowUnfollowRequest(user: User, url: string) {
        let searchParams = new URLSearchParams();
        searchParams.append("friendID", user.userID);
        return this.authHttp.post(OORSI_API_ENDPOINT + url, undefined, { search: searchParams });
    }
}
