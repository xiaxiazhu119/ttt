import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule } from '@angular/material';

import { SharedImageCaptchaComponent } from './shared-image-captcha.component';

@NgModule({
  declarations: [SharedImageCaptchaComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule,
  ],
  exports: [SharedImageCaptchaComponent]
})
export class SharedImageCaptchaModule { }
