import { AuthService } from './../../../service/auth/auth.service';
import { User } from '../../../model/user';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FriendshipService } from '../../../service/friendship/friendship.service';

@Component({
  selector: 'oorsi-web-friend-search',
  templateUrl: './friend-search.component.html',
  styleUrls: ['./friend-search.component.css']
})
export class FriendSearchComponent implements OnInit, OnDestroy {

  users: User[];

  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private friendshipService: FriendshipService, private authService: AuthService) { }

  ngOnInit() {
    this.subscription = this.route.queryParams.subscribe(
      (queryParam: any) => {
        this.friendshipService.search(queryParam['s'])
          .subscribe(
          data => {
            this.users = data;
          }, err => this.authService.checkError(err)
          )
      }
    );

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
