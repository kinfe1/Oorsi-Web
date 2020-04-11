import { WishListProduct } from './../../../model/wishlistproduct';
import { Component, OnInit, Input } from '@angular/core';
import { Activity } from 'src/app/model/activity';

@Component({
  selector: 'oorsi-web-news-feed-item',
  templateUrl: './news-feed-item.component.html',
  styleUrls: ['./news-feed-item.component.css']
})
export class NewsFeedItemComponent implements OnInit {
  @Input() activity: Activity;

  constructor() { }

  ngOnInit() {
  }

}
