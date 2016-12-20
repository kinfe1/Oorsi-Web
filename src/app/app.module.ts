import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavComponent } from './component/nav/nav.component';
import { ProductItemComponent } from './component/shop/product/product-item/product-item.component';
import { ProductListComponent } from './component/shop/product/product-list/product-list.component';
import { ProductComponent } from './component/shop/product/product.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ProductItemComponent,
    ProductListComponent,
    ProductComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
