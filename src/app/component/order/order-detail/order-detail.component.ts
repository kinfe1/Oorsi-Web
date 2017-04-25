import { Subscription } from 'rxjs/Rx';
import { OrderService } from './../../../service/order.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'oorsi-web-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit, OnDestroy {

  private order: any;

  constructor(private orderService: OrderService, private route: ActivatedRoute) { }

  private subscription: Subscription;

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (param: any) => {
        this.orderService.getOrder(param['id'])
          .subscribe(
          data => {
            this.order = data;
          }
          )

      }
    );

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
