import { User } from './../../../model/user';
import { Component, OnInit } from '@angular/core';
import { FriendshipService } from '../../../service/friendship/friendship.service';
import { FacebookService } from '../../../service/fb/facebook.service';

@Component({
  selector: 'oorsi-web-friend-fb-search',
  templateUrl: './friend-fb-search.component.html',
  styleUrls: ['./friend-fb-search.component.css']
})
export class FriendFbSearchComponent implements OnInit {
  
  users: User[];
  
  constructor(private facebookService: FacebookService) { }

  ngOnInit() {
    this.facebookService.getFBFriends()
      .subscribe(
      data => {
        this.users = data;
      }
      )


  }

}
