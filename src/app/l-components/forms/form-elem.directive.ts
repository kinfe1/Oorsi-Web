import {
  Directive,
  Input,
  OnDestroy,
  ElementRef,
  Renderer2,
  HostListener,
} from "@angular/core";
import { FormControlName, FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@Directive({
  selector: "[oorsiFormElem]",
})
export class FormElemDirective implements OnDestroy {
  @Input() public placeholder = "";

  constructor(
    private formControlName: FormControlName
  ) {}

  public get control() {
    return this.formControlName.control;
  }

  public get label() {
    return this.placeholder;
  }

  ngOnDestroy() {
  }
}
