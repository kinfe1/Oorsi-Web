import {
  Component,
  OnInit,
  ContentChild,
  AfterContentInit,
} from "@angular/core";
import { FormControlName, FormControl } from "@angular/forms";
import { FormElemDirective } from "../form-elem.directive";

@Component({
  selector: "oorsi-form-elem",
  templateUrl: "./form-elem.component.html",
  styleUrls: ["./form-elem.component.css"],
})
export class FormElemComponent implements AfterContentInit {

  @ContentChild(FormElemDirective) formElem: FormElemDirective;

  ngAfterContentInit() {
    this.formElem.subscribe()
  }

  get control() {
    return this.formElem?.control;
  }

  get errors() {
    return this.control?.errors;
  }
}
