import { OORSI_API_ENDPOINT } from './../../../const';
import { AuthService } from './../../../service/auth/auth.service';
import { User } from './../../../model/user';

import { Component, Input } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { FriendshipService } from '../../../service/friendship/friendship.service';

@Component({
  selector: 'oorsi-web-friends-item',
  templateUrl: './friends-item.component.html',
  styleUrls: ['./friends-item.component.css']
})
export class FriendsItemComponent {

  @Input() user: User;

  followButtonText: string = "Follow";


  constructor(private friendshipService: FriendshipService, private authService: AuthService) { }

  ngDoCheck() {
    if (this.user.followed) {
      this.followButtonText = "Following";
    } else {
      this.followButtonText = "Follow";
    }
  }

  onFollow(user: User) {
    if (!this.user.followed) {
      this.friendshipService.follow(user).subscribe(data => {
        this.user.followed = true;
      }, err => this.authService.checkError(err));
    }
    else {
      this.friendshipService.unfollow(user).subscribe(data => {
        this.user.followed = false;
      }, err => this.authService.checkError(err));
    }

  }

}
