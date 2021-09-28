import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { XNgLibsDialogModule } from 'x-ng-libs';

import { SysFieldEditDialogModule } from '../../dialog/sys-field-edit-dialog.module';
import { SysFieldEditDialogComponent } from '../../dialog/sys-field-edit-dialog.component';

import { SysFieldEditDialogBtnComponent } from './sys-field-edit-dialog-btn.component';

@NgModule({
  declarations: [SysFieldEditDialogBtnComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatButtonModule,
    XNgLibsDialogModule,
    SysFieldEditDialogModule
  ],
  exports: [SysFieldEditDialogBtnComponent],
  entryComponents: [SysFieldEditDialogComponent]
})
export class SysFieldEditDialogBtnModule { }
