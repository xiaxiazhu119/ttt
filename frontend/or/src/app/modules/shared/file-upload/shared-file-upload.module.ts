import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, } from '@angular/material';

import { XNgLibsFileUploadModule } from 'x-ng-libs';

import { SharedFileUploadComponent } from './shared-file-upload.component';

@NgModule({
  declarations: [SharedFileUploadComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule,
    XNgLibsFileUploadModule
  ],
  exports: [SharedFileUploadComponent]
})
export class SharedFileUploadModule { }
