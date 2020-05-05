import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  /**
   *
   */
  private signupFormGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signupFormGroup = fb.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.signupFormGroup.markAllAsTouched();
    if(this.signupFormGroup.valid) {
      console.log('form valid and subscribing.')
    }

  }
}
