import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule } from '@angular/material';

import { SysFieldEditDialogComponent } from './sys-field-edit-dialog.component';

@NgModule({
  declarations: [SysFieldEditDialogComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule,
  ],
  exports: [SysFieldEditDialogComponent]
})
export class SysFieldEditDialogModule { }
