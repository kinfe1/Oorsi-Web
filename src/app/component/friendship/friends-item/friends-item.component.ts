import { User } from '../../../model/user';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'oorsi-web-friends-item',
  templateUrl: './friends-item.component.html',
  styleUrls: ['./friends-item.component.css']
})
export class FriendsItemComponent implements OnInit {

  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
