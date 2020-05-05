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
  @Input() private invalidStyle = "invalid";

  private stateSubscription: Subscription;

  constructor(
    private formControlName: FormControlName,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  @HostListener("blur")
  loseFocus() {
    this.stateChanged();
  }

  subscribe() {
    this.stateSubscription = this.formControlName.control.statusChanges.subscribe(
      this.stateChanged.bind(this)
    );
  }

  stateChanged() {
    if (this.control.status == "INVALID" && this.control.touched) {
      this.renderer.addClass(this.elementRef.nativeElement, this.invalidStyle);
    } else {
      this.renderer.removeClass(
        this.elementRef.nativeElement,
        this.invalidStyle
      );
    }
  }

  public get control() {
    return this.formControlName.control;
  }

  public get label() {
    return this.placeholder;
  }

  ngOnDestroy() {
    if (this.stateSubscription != null) this.stateSubscription.unsubscribe();
  }
}
