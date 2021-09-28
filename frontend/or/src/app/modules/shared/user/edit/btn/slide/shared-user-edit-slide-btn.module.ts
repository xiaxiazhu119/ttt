import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule } from '@angular/material';

import { SharedUserEditFormModule } from '../../form/shared-user-edit-form.module';

import { SharedUserEditSlideBtnComponent } from './shared-user-edit-slide-btn.component';

@NgModule({
  declarations: [SharedUserEditSlideBtnComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule,
    SharedUserEditFormModule
  ],
  exports: [SharedUserEditSlideBtnComponent]
})
export class SharedUserEditSlideBtnModule { }
