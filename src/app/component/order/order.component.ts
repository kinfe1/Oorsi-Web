import { AuthService } from './../../service/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../service/order.service';
import { Order } from '../../model/order';

@Component({
  selector: 'oorsi-web-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders: Order[] = [];

  constructor(private orderService: OrderService, private authService: AuthService) { }

  ngOnInit() {
    this.orderService.getAllOrders().subscribe(data => this.orders = data, err => this.authService.checkError(err));
  }

}
