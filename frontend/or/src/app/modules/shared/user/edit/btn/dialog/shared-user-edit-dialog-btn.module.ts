import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { XNgLibsDialogModule } from 'x-ng-libs';

import { SharedUserEditDialogModule } from '../../dialog/shared-user-edit-dialog.module';
import { SharedUserEditDialogComponent } from '../../dialog/shared-user-edit-dialog.component';

import { SharedUserEditDialogBtnComponent } from './shared-user-edit-dialog-btn.component';

@NgModule({
  declarations: [SharedUserEditDialogBtnComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatButtonModule,
    XNgLibsDialogModule,
    SharedUserEditDialogModule
  ],
  exports: [SharedUserEditDialogBtnComponent],
  entryComponents: [SharedUserEditDialogComponent]
})
export class SharedUserEditDialogBtnModule { }
