import { AuthService } from './../../../service/auth/auth.service';
import { User } from './../../../model/user';
import { Component, OnInit } from '@angular/core';
import { FriendshipService } from '../../../service/friendship/friendship.service';
import { FacebookService } from '../../../service/fb/facebook.service';

declare const FB: any;

@Component({
  selector: 'oorsi-web-friend-fb-search',
  templateUrl: './friend-fb-search.component.html',
  styleUrls: ['./friend-fb-search.component.css']
})


export class FriendFbSearchComponent implements OnInit {

  users: User[];

  constructor(private facebookService: FacebookService, private authService: AuthService) { }

  ngOnInit() {

    FB.getLoginStatus(response => {
      console.log(response);
      if (response.status === 'connected') {
        this.searchFBFriends(response.authResponse.accessToken);
      }
      else {
        FB.login(response => {
          console.log(response);
          if (response.status === 'connected') {
            this.searchFBFriends(response.authResponse.accessToken);
          }
        }, { scope: 'user_friends' });
      }
    }, { scope: 'user_friends' });

  }

  searchFBFriends(accessToken: string) {
    this.facebookService.getFBFriends(accessToken)
      .subscribe(
      data => {
        this.users = data;
      }, err => this.authService.checkError(err)
      )

  }

}
