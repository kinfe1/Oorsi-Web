import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'oorsi-web-friendship',
  templateUrl: './friendship.component.html',
  styleUrls: ['./friendship.component.css']
})
export class FriendshipComponent implements OnInit {

  searchString: string;
  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.subscription = this.route.queryParams.subscribe(
      (queryParam: any) => {
        this.searchString = queryParam['s'];
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSearch() {
    this.router.navigate(['/friends/search'], { queryParams: { s: this.searchString } });
  }

  onFacebookFriendSearch() {
    this.router.navigate(['/friends/fb']);
  }

}
