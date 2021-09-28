import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule } from '@angular/material';

import { SharedUserEditFormComponent } from './shared-user-edit-form.component';

@NgModule({
  declarations: [SharedUserEditFormComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule,
  ],
  exports: [SharedUserEditFormComponent]
})
export class SharedUserEditFormModule { }
