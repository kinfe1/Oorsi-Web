import { OORSI_API_ENDPOINT } from './../../../const';
import { AuthService } from './../../../service/auth/auth.service';
import { User } from './../../../model/user';

import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { FriendshipService } from '../../../service/friendship/friendship.service';

@Component({
  selector: 'oorsi-web-friends-item',
  templateUrl: './friends-item.component.html',
  styleUrls: ['./friends-item.component.css']
})
export class FriendsItemComponent implements OnInit, OnChanges {

  @Input() user: User;

  followButtonText: string = "Follow";
  @Input() following: boolean = false;


  constructor(private friendshipService: FriendshipService) { }

  ngOnInit() {
    console.log("FriendsItemComponent.ngOnInit")

  }

  ngOnChanges() {
    console.log("FriendsItemComponent.ngOnChanges")
    
  }

  ngDoCheck() {
    console.log("FriendsItemComponent.ngDoCheck")
    if (this.following) {
      this.followButtonText = "Following";
    } else {
      this.followButtonText = "Follow";
    }
  }

  onFollow(user: User) {
    if (!this.following) {
      this.friendshipService.follow(user).subscribe(data => {
        this.following = true;
      });
    }
    else {
      this.friendshipService.unfollow(user).subscribe(data => {
        this.following = false;
      });
    }

  }

}
