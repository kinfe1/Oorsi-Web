import { PaymentService } from '../../service/payment.service';
import { Subscription } from 'rxjs/Rx';
import { User } from './../../model/user';
import { Router, ActivatedRoute } from '@angular/router';
import { CartProduct } from './../../model/cartProduct';
import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { CheckoutService } from '../../service/checkout/checkout.service';
import { AddressService } from '../../service/address/address.service';
import { Card } from '../../model/card';
import { AuthService } from '../../service/auth/auth.service';
import { Address } from '../../model/address';

@Component({
    selector: 'oorsi-web-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {

    private subscription: Subscription;

    user: User;
    shipTo: number = 2;

    shippingAddress: number;
    paymentMethod: string;

    addresses: Address[];
    paymentMethods: Card[];

    constructor(private route: ActivatedRoute, private router: Router, private checkoutService: CheckoutService, private addressService: AddressService, private paymentService: PaymentService, private authService: AuthService) { }

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
                        }, err => this.authService.checkError(err)
                    )
            }
        );

        this.addressService.getAllAddresses().subscribe(data => this.addresses = data, err => this.authService.checkError(err));
        this.paymentService.getAllPayments().subscribe(data => this.paymentMethods = data, err => this.authService.checkError(err));

    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onAddressSaved(address: Address) {
        this.addresses.push(address);
    }

    onPaymentSaved(card: Card) {
        this.paymentMethods.push(card);
    }

    submitOrder() {
        this.checkoutService.submitOrder(this.user.userID, this.shipTo, this.shippingAddress, this.paymentMethod)
            .subscribe(
                data => this.router.navigate(['/orders/id/' + data.id]),
                err => this.authService.checkError(err)
            )
    }

    decrease(cartProduct: CartProduct): void {

    }

    increase(cartProduct: CartProduct): void {

    }
}
