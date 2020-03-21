import { Product } from "../../../../model/product";
import { Subscription } from "rxjs/Rx";
import { ProductService } from "./../../../../service/product/product.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

/**
 * ProductListComponent is only responsible for fetching query param "s" value,
 * pass it to product service and get the products list recieved to be displated in a
 * card manner.
 */
@Component({
  selector: "oorsi-web-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit, OnDestroy {
  /**
   * list of products that will be displated in the template
   */
  products: Product[];

  /**
   * subscription received from activated route queryParam
   */
  private subscription: Subscription;

  /**
   * @param productService product service that will be used get products from backend
   * @param route activated route, will be used to get the queryParam
   */
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    /** subscribe to queryParams of activated route. */
    this.subscription = this.route.queryParams.subscribe((queryParam: any) => {
      /** use received query param to the product service search parameter */
      this.productService.search(queryParam["s"]).subscribe(data => {
        /** pass recieved data to propery */
        this.products = data;
      });
    });
  }

  ngOnDestroy() {
    /** cleanup subscriptions */
    this.subscription.unsubscribe();
  }
}
