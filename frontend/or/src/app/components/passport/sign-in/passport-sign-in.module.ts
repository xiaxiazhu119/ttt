import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule } from '@angular/material';

import { PassportSignInComponent } from './passport-sign-in.component';
import { PassportSignInRoutingModule } from './passport-sign-in-routing.module';
import { SharedImageCaptchaModule } from '@app/modules/public-api';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule,
    SharedImageCaptchaModule,
    PassportSignInRoutingModule
  ],
  declarations: [PassportSignInComponent],
  exports: [PassportSignInComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PassportSignInModule {
}
