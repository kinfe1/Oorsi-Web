import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-add-phonenumber",
  templateUrl: "./add-phonenumber.component.html",
  styleUrls: ["./add-phonenumber.component.css"],
})
export class AddPhonenumberComponent implements OnInit {
  submitted = false;

  phoneNumberFormGroup: FormGroup;

  constructor(fb: FormBuilder) {
    this.phoneNumberFormGroup = fb.group({
      phoneNumber: ["", [Validators.required]],
      verifyCode: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log("submitted");
    this.phoneNumberFormGroup.controls.phoneNumber.markAsTouched();
    console.log(this.phoneNumberFormGroup.value);
    console.log(this.phoneNumberFormGroup.controls.phoneNumber.errors);

    if (
      this.phoneNumberFormGroup.controls.phoneNumber.valid &&
      this.phoneNumberFormGroup.controls.verifyCode.valid
    ) {
      // send verifivation code to server to complete this form

      return;
    }

    if (this.phoneNumberFormGroup.controls.phoneNumber.valid) {
      // perform phone verification and
      // mark submitted to true if correct
      this.submitted = true;
    }
  }
}
