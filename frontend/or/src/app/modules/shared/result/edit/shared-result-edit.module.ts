import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule } from '@angular/material';

import { SharedResultEditComponent } from './shared-result-edit.component';
import { SharedFileUploadModule } from '../../file-upload/shared-file-upload.module';

@NgModule({
  declarations: [SharedResultEditComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule,
    SharedFileUploadModule
  ],
  exports: [SharedResultEditComponent]
})
export class SharedResultEditModule { }
