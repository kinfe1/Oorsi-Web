import { AuthService } from './../../service/auth/auth.service';
import { Address } from 'cluster';
import { FormGroupName } from '@angular/forms/src/directives';
import { AddressService } from './../../service/address/address.service';
import { Component, OnInit, OnChanges, EventEmitter, Output } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'oorsi-web-address',
    templateUrl: './address.component.html',
    styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

    complexForm: FormGroup;
    error: boolean;

    @Output() save: EventEmitter<Address> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();

    constructor(private addressService: AddressService, fb: FormBuilder, private authService: AuthService) {

        this.complexForm = fb.group({
            'firstName': ["", Validators.required],
            'lastName': ["", Validators.required],
            'address1': ["", Validators.required],
            'address2': [""],
            'city': ["", Validators.required],
            'state': ["", Validators.required],
            'zip': ["", [Validators.required]],
            'phone': ["", [Validators.required]]

        })
    }

    ngOnInit() {
    }


    submitForm() {
        var address = '';

        address = address + this.complexForm.value.address1 + ' ';

        if (this.complexForm.value.address2 != null && this.complexForm.value.address2 != '') {
            address = address + this.complexForm.value.address2 + ' ';
        }
        address = address + this.complexForm.value.city + ' ';
        address = address + this.complexForm.value.state + ' ';
        address = address + this.complexForm.value.zip + ' ';

        this.addressService.validateAddress(address).subscribe(data => {
            let validationStatus: any = data;
            if (validationStatus.status == 'OK') {
                this.complexForm.value['formattedAddress'] = validationStatus.results[0].formatted_address;
            }
            this.addressService.saveAddress(this.complexForm.value).subscribe(data => this.save.emit(data), err => this.authService.checkError(err));
        }, err => this.authService.checkError(err));
    }

    onCancel() {
        this.cancel.emit();
    }

}
