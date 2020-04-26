import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAmazonProductToWishlistComponent } from './add-amazon-product-to-wishlist.component';

describe('AddAmazonProductToWishlistComponent', () => {
  let component: AddAmazonProductToWishlistComponent;
  let fixture: ComponentFixture<AddAmazonProductToWishlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAmazonProductToWishlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAmazonProductToWishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
