import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../../service/product/product.service";
import { Product } from "../../../model/product";

/**
 * Component that displays trending products,
 * it is used as the home for shoping.
 */
@Component({
  selector: "app-shop-home",
  templateUrl: "./shop-home.component.html",
  styleUrls: ["./shop-home.component.css"]
})
export class ShopHomeComponent implements OnInit {
  /**
   * list of trending products to be displayed
   */
  trendingProducts: Product[] = [];

  /**
   *
   * @param productService where the products are fetched from
   */
  constructor(private productService: ProductService) {}

  ngOnInit() {
    /**
     * fetch trending products and put them in trendingProducts property for display
     */
    this.productService
      .trendingProducts()
      .subscribe(data => (this.trendingProducts = data));
  }
}
