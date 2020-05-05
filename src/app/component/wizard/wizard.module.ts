import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { WizardComponent } from "./wizard.component";
import { SignupComponent } from "./signup/signup.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { AddBirthdayComponent } from "./add-birthday/add-birthday.component";
import { AddAmazonProductComponent } from "./add-amazon-product/add-amazon-product.component";
import { SearchProductComponent } from "./search-product/search-product.component";
import { AddPhonenumberComponent } from "./add-phonenumber/add-phonenumber.component";
import { IformsModule } from "src/app/l-components/forms/iforms.module";

const wizardRoutes: Routes = [
  {
    path: "",
    component: WizardComponent,
    children: [
      {
        path: "signup",
        component: SignupComponent,
      },
      {
        path: "add-phone",
        component: AddPhonenumberComponent,
      },
      {
        path: "",
        pathMatch: "full",
        component: WelcomeComponent,
      },
      // ,
      // {
      //   path: 'loader',
      //   component: LoaderDialogComponent,
      //   data: { title: 'Loader', breadcrumb: 'LOADER' },
      // }
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(wizardRoutes),
    ReactiveFormsModule,
    IformsModule,
  ],
  declarations: [
    WizardComponent,
    SignupComponent,
    AddPhonenumberComponent,
    WelcomeComponent,
    AddBirthdayComponent,
    AddAmazonProductComponent,
    SearchProductComponent,
  ],
  providers: [],
})
export class WizardModule {}
