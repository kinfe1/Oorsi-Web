import { NewsFeedService } from "../../service/news-feed/news-feed.service";
import { WishListProduct } from "./../../model/wishlistproduct";
import { Component, OnInit } from "@angular/core";
import { WishlistService } from "../../service/wishlist.service";
import { AuthService } from "../../service/auth/auth.service";

/**
 * this component gets list of news feed and displays them as a list of
 * news feed items.
 * if there are no news feeds, it shows a "to follow friends"
 */
@Component({
  selector: "oorsi-web-news-feed",
  templateUrl: "./news-feed.component.html",
  styleUrls: ["./news-feed.component.css"]
})
export class NewsFeedComponent implements OnInit {
  /**
   * news feed list container variable defaulted to empty
   */
  wishlistProducts: WishListProduct[] = [];

  /**
   *
   * @param newsFeedService service to get the latest news feed from
   * @param authService to check error from http results
   */
  constructor(
    private newsFeedService: NewsFeedService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    /** get news feed */
    this.newsFeedService.getNewsFeed().subscribe(
      data => {
        this.wishlistProducts = data;
      },
      err => this.authService.checkError(err)
    );
  }
}
