import { AuthService } from './../../service/auth/auth.service';
import { environment } from '../../../environments/environment.dev';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { PaymentService } from '../../service/payment.service';
import { Card } from '../../model/card';


declare const Stripe: any;


@Component({
  selector: 'oorsi-web-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  errorText: string;
  error: boolean = false;

  @Output() save: EventEmitter<Card> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();

  constructor(private paymentService: PaymentService, private authService: AuthService) { }

  ngOnInit() {
    Stripe.setPublishableKey(environment.stripePublishableKey);
  }

  submit(form) {
    Stripe.card.createToken({
      number: form.cardNumber,
      cvc: form.cvc,
      exp_month: form.expMonth,
      exp_year: form.expYear
    }, (status, response) => this.stripeResponseHandler(status, response));
  }

  stripeResponseHandler(status, response) {
    if (response.error) {
      this.error = true;
      this.errorText = response.error.message;
    } else {
      this.paymentService.sendToken(response.id, true).subscribe(data => this.save.emit(data), err => this.authService.checkError(err));
    }

  }

  onCancel() {
    this.cancel.emit();
  }


}
