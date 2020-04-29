import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAmazonProductComponent } from './add-amazon-product.component';

describe('AddAmazonProductComponent', () => {
  let component: AddAmazonProductComponent;
  let fixture: ComponentFixture<AddAmazonProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAmazonProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAmazonProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
