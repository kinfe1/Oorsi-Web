import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/model/product';
import { AuthService } from 'src/app/service/auth/auth.service';
import { WishlistService } from 'src/app/service/wishlist.service';
import { WishListProduct } from 'src/app/model/wishlistproduct';

@Component({
  selector: 'app-add-amazon-product-to-wishlist',
  templateUrl: './add-amazon-product-to-wishlist.component.html',
  styleUrls: ['./add-amazon-product-to-wishlist.component.css']
})
export class AddAmazonProductToWishlistComponent implements OnInit {

  complexForm: FormGroup;
  error: boolean;

  @Output() save: EventEmitter<WishListProduct> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();

  constructor(private wishlistService: WishlistService, fb: FormBuilder, private authService: AuthService) {

    this.complexForm = fb.group({
      'url': ["", Validators.required]
    })
  }

  ngOnInit() {
  }


  submitForm() {
    this.wishlistService.addAmazonUrlToWishlist(this.complexForm.value).subscribe(data => {
      this.save.emit(data);
      this.complexForm.reset(this.complexForm.value);
    }, err => this.authService.checkError(err));
  }

  onCancel() {
    this.cancel.emit();
  }


}
