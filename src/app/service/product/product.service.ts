import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {

  products: [{
    "productId": null,
    "retailer": "BEST_BUY",
    "sku": 5389000,
    "name": "Sony - PlayStation 4 Console Uncharted 4: A Thief's End Bundle",
    "active": true,
    "regularPrice": 299.99,
    "salePrice": 249.99,
    "onSale": true,
    "onlineAvailability": true,
    "shortDescription": "Journey through the gaming universe with nearly limitless possibilities",
    "longDescription": "Play online, enjoy single player and game on with this PlayStation 4 Uncharted bundle. It includes a matching DualShock wireless controller and Uncharted 4: A Thief's End so that you can instantly enjoy the latest title in this legendary series. Outstanding graphics and compatibility with Blu-ray ensures this PlayStation 4 Uncharted bundle is a complete entertainment package.",
    "image": "http://img.bbystatic.com/BestBuy_US/images/products/5389/5389000_sa.jpg",
    "largeFrontImage": "http://img.bbystatic.com/BestBuy_US/images/products/5389/5389000_sa.jpg",
    "mediumImage": "http://img.bbystatic.com/BestBuy_US/images/products/5389/5389000fp.gif",
    "thumbnailImage": "http://img.bbystatic.com/BestBuy_US/images/products/5389/5389000_s.gif",
    "largeImage": "http://img.bbystatic.com/BestBuy_US/images/products/5389/5389000_sb.jpg",
    "manufacturer": "Sony"
  }]

  constructor() { }

  search() {
    return this.products;
  }

}
