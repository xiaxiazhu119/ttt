import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule } from '@angular/material';

import { PassportSignUpRoutingModule } from './passport-sign-up-routing.module';
import { PassportSignUpComponent } from './passport-sign-up.component';
import { SharedImageCaptchaModule } from '@app/modules/public-api';

@NgModule({
  declarations: [PassportSignUpComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule,
    SharedImageCaptchaModule,
    PassportSignUpRoutingModule
  ],
  exports: [PassportSignUpComponent]
})
export class PassportSignUpModule { }
