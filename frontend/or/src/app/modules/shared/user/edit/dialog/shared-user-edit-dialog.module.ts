import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule } from '@angular/material';

import { SharedUserEditFormModule } from '../form/shared-user-edit-form.module';

import { SharedUserEditDialogComponent } from './shared-user-edit-dialog.component';

@NgModule({
  declarations: [SharedUserEditDialogComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule,
    SharedUserEditFormModule
  ],
  exports: [SharedUserEditDialogComponent]
})
export class SharedUserEditDialogModule { }
