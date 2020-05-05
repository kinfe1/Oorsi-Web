/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormElemComponent } from './form-elem.component';

describe('FormElemComponent', () => {
  let component: FormElemComponent;
  let fixture: ComponentFixture<FormElemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormElemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormElemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
