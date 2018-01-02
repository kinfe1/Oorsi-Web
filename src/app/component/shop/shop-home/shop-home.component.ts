import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product/product.service';
import { Product } from '../../../model/product';

@Component({
  selector: 'app-shop-home',
  templateUrl: './shop-home.component.html',
  styleUrls: ['./shop-home.component.css']
})
export class ShopHomeComponent implements OnInit {

  trendingProducts: Product[] = []

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.trendingProducts().subscribe(data => this.trendingProducts = data);
  }

}
