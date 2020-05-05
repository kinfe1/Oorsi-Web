import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormElemComponent } from "./form-elem/form-elem.component";
import { FormElemDirective } from './form-elem.directive';

const PIBLIC_DIRECTIVES = [FormElemDirective, FormElemComponent];

@NgModule({
  imports: [CommonModule],
  declarations: [...PIBLIC_DIRECTIVES],
  exports: [...PIBLIC_DIRECTIVES],
})
export class IformsModule {}
