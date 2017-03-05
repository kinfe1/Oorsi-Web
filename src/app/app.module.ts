import { PaymentService } from './service/payment.service';
import { AddressService } from './service/address/address.service';
import { FriendSearchComponent } from './component/friendship/friend-search/friend-search.component';
import { WishlistService } from './service/wishlist.service';
import { RequestOptionsArgs } from '@angular/http/src/interfaces';
import { AUTH_PROVIDERS, AuthConfigConsts, AuthHttp, IAuthConfig, provideAuth, AuthConfig } from 'angular2-jwt';
import { ProductService } from './service/product/product.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, RequestOptions, Http } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { ModalModule } from 'ng2-bootstrap/modal';



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
import { LogoutComponent } from './component/user/login/logout.component';
import { WishlistComponent } from './component/wishlist/wishlist.component';
import { WishlistItemComponent } from './component/wishlist/wishlist-item.component';
import { NewsFeedItemComponent } from './component/news-feed/news-feed-item/news-feed-item.component';
import { NewsFeedService } from './service/news-feed/news-feed.service';
import { CartService } from './service/cart/cart.service';
import { CartComponent } from './component/cart/cart.component';
import { FriendshipService } from './service/friendship/friendship.service';
import { FriendsItemComponent } from './component/friendship/friends-item/friends-item.component';
import { FriendListComponent } from './component/friendship/friend-list/friend-list.component';
import { FriendFbSearchComponent } from './component/friendship/friend-fb-search/friend-fb-search.component';
import { FacebookService } from './service/fb/facebook.service';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { CheckoutService } from './service/checkout/checkout.service';
import { AddressComponent } from './component/address/address.component';
import { PaymentComponent } from './component/payment/payment.component';


const appRoutes: Routes = [
    { path: '', redirectTo: "/news", pathMatch: "full" },
    { path: 'shop', component: ProductComponent, children: [{ path: "search", component: ProductListComponent }, { path: "r/:retailer/sku/:sku", component: ProductDetailComponent }, { path: "id/:id", component: ProductDetailComponent }] },
    { path: 'news', component: NewsFeedComponent, canActivate: [AuthService] },
    { path: 'friends', component: FriendshipComponent, canActivate: [AuthService], children: [{ path: "", component: FriendListComponent }, { path: "search", component: FriendSearchComponent }, { path: "fb", component: FriendFbSearchComponent }] },
    { path: 'wishlist', component: WishlistComponent, canActivate: [AuthService] },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'cart', component: CartComponent, canActivate: [AuthService] },
    { path: 'checkout/for/:id', component: CheckoutComponent, canActivate: [AuthService] },
    { path: 'address', component: AddressComponent },
];

export function authHttpServiceFactory(http: Http, options: RequestOptions) {

    return new AuthHttp(new AuthConfig({
        headerName: 'jwt-token',
        tokenGetter: (() => localStorage.getItem('currentUser')),
        globalHeaders: [{ 'Content-Type': 'application/json' }],
    }), http, options);
}


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
        RegisterComponent,
        LogoutComponent,
        WishlistComponent,
        WishlistItemComponent,
        NewsFeedItemComponent,
        CartComponent,
        FriendSearchComponent,
        FriendsItemComponent,
        FriendListComponent,
        FriendFbSearchComponent,
        CheckoutComponent,
        AddressComponent,
        PaymentComponent,

    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes), ModalModule.forRoot(), ReactiveFormsModule
    ],
    providers: [ProductService, AuthService, WishlistService, NewsFeedService, CartService, FriendshipService, FacebookService, CheckoutService, AddressService, PaymentService,
        {
            provide: AuthHttp,
            useFactory: authHttpServiceFactory,
            deps: [Http, RequestOptions]
        }],
    bootstrap: [AppComponent]
})
export class AppModule { }
