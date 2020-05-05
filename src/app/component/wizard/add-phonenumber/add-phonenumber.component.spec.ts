import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPhonenumberComponent } from './add-phonenumber.component';

describe('AddPhonenumberComponent', () => {
  let component: AddPhonenumberComponent;
  let fixture: ComponentFixture<AddPhonenumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPhonenumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPhonenumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
