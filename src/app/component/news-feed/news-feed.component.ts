import { NewsFeedService } from '../../service/news-feed/news-feed.service';
import { WishListProduct } from './../../model/wishlistproduct';
import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../service/wishlist.service';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'oorsi-web-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {

  wishlistProducts: WishListProduct[] = []

  constructor(private newsFeedService: NewsFeedService, private authService: AuthService) { }

  ngOnInit() {
    this.newsFeedService.getNewsFeed()
      .subscribe(
      data => {
        this.wishlistProducts = data;
      }, err => this.authService.checkError(err))
  }

}
