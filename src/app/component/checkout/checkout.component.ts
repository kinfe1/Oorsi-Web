import { Address } from 'cluster';
import { Subscription } from 'rxjs/Rx';
import { User } from './../../model/user';
import { Router, ActivatedRoute } from '@angular/router';
import { CartProduct } from './../../model/cartProduct';
import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { CheckoutService } from '../../service/checkout/checkout.service';
import { AddressService } from '../../service/address/address.service';

@Component({
    selector: 'oorsi-web-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {

    private subscription: Subscription;

    user: User;
    shipTo: number = 2;
    addresses: Address[];

    constructor(private route: ActivatedRoute, private checkoutService: CheckoutService, private addressService: AddressService) { }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(
            (param: any) => {
                this.checkoutService.getCheckoutProducts(param['id'])
                    .subscribe(
                    data => {
                        let cartProducts: CartProduct[] = data;
                        if (cartProducts && null != cartProducts && cartProducts.length > 0) {
                            this.user = new User(cartProducts[0].forUser);
                            for (let cartProduct of cartProducts) {
                                this.user.addCartProduct(cartProduct);
                            }
                        }
                    }
                    )
            }
        );

        this.addressService.getAllAddresses().subscribe(data => this.addresses = data);

    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }



    onAddressEmit(address: Address) {
        this.addresses.push(address);
    }
}
