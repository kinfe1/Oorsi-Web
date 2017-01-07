import { AuthHttp } from 'angular2-jwt';
import { AuthService } from './../auth/auth.service';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
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

    public getFriends(): Observable<User[]> {

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.authService.addAuthHeader(headers);
        return this.http.get(OORSI_API_ENDPOINT + 'friends', { headers: headers }).map((response: Response) => response.json());

    }

    public follow(user: User) {
        return this.sendFollowUnfollowRequest(user, "friends/follow");
    }

    public unfollow(user: User) {
        return this.sendFollowUnfollowRequest(user, "friends/unfollow");
    }

    public sendFollowUnfollowRequest(user: User, url: string) {
        let headers: Headers = new Headers();
        this.authService.addAuthHeader(headers);

        let searchParams = new URLSearchParams();
        searchParams.append("friendID", user.userID);

        return this.http.post(OORSI_API_ENDPOINT + url, undefined, { headers: headers, search: searchParams });
    }
}
