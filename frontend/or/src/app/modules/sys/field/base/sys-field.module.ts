import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatMenuModule } from '@angular/material';

import { SysFieldEditDialogBtnModule } from '../btn/edit-dialog/sys-field-edit-dialog-btn.module';

import { SysFieldComponent } from './sys-field.component';

@NgModule({
  declarations: [SysFieldComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule,
    SysFieldEditDialogBtnModule
  ],
  exports: [SysFieldComponent]
})
export class SysFieldModule { }
