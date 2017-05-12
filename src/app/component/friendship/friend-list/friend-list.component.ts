import { User } from '../../../model/user';
import { FriendshipService } from './../../../service/friendship/friendship.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth/auth.service';

@Component({
  selector: 'oorsi-web-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {

  users: User[] = [];

  constructor(private friendshipService: FriendshipService, private authService: AuthService) { }

  ngOnInit() {
    this.friendshipService.getFriends().subscribe(data => {
      this.users = data;
      for (let user of this.users) {
        user.followed = true;
      }
    }), err => this.authService.checkError(err);
  }

}
