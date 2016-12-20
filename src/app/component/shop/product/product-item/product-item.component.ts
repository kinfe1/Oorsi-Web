import { ProductService } from './../../../../service/product/product.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'oorsi-web-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {

  @Input() product;

  @Input() index: number;

  constructor() { }


}
