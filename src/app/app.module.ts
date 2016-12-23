import { ProductService } from './service/product/product.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavComponent } from './component/nav/nav.component';
import { ProductItemComponent } from './component/shop/product/product-item/product-item.component';
import { ProductListComponent } from './component/shop/product/product-list/product-list.component';
import { ProductComponent } from './component/shop/product/product.component';
import { NewsFeedComponent } from './component/news-feed/news-feed.component';
import { FriendshipComponent } from './component/friendship/friendship.component';
import { ProductDetailComponent } from './component/shop/product/product-detail/product-detail.component';
import { LoginComponent } from './component/user/login/login.component';
import { RegisterComponent } from './component/user/register/register.component';
import { AuthService } from './service/auth/auth.service';

const appRoutes: Routes = [
    { path: '', redirectTo: "/news", pathMatch: "full" },
    { path: 'shop', component: ProductComponent, children: [{ path: "search", component: ProductListComponent }, { path: "sku/:sku", component: ProductDetailComponent }] },
    { path: 'news', component: NewsFeedComponent },
    { path: 'friends', component: FriendshipComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
];

@NgModule({
    declarations: [
        AppComponent,
        NavComponent,
        ProductItemComponent,
        ProductListComponent,
        ProductComponent,
        NewsFeedComponent,
        FriendshipComponent,
        ProductDetailComponent,
        LoginComponent,
        RegisterComponent

    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [ProductService, AuthService],
    bootstrap: [AppComponent]
})
export class AppModule { }
