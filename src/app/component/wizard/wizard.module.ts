import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WizardComponent } from './wizard.component';
import { SignupComponent } from './signup/signup.component';
import { RegisterComponent } from '../user/register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AddBirthdayComponent } from './add-birthday/add-birthday.component';
import { AddAmazonProductComponent } from './add-amazon-product/add-amazon-product.component';
import { SearchProductComponent } from './search-product/search-product.component';

const wizardRoutes: Routes = [
    {
        path: '',
        component: WizardComponent,
        children: [
            {
                path: 'signup',
                component: RegisterComponent,
            }
            , {
                path: 'welcome',
                component: WelcomeComponent,
            }
            // , 
            // {
            //   path: 'loader',
            //   component: LoaderDialogComponent,
            //   data: { title: 'Loader', breadcrumb: 'LOADER' },
            // }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(wizardRoutes), ReactiveFormsModule, ReactiveFormsModule
    ],
    declarations: [WizardComponent, WelcomeComponent, AddBirthdayComponent, AddAmazonProductComponent, SearchProductComponent],
    providers: []
})
export class WizardModule { }
