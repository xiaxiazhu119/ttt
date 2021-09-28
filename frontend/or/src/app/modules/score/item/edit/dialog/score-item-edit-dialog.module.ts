import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule } from '@angular/material';

import { ScoreItemEditDialogComponent } from './score-item-edit-dialog.component';
import { ScoreItemEditFormModule } from '../form/score-item-edit-form.module';

@NgModule({
  declarations: [ScoreItemEditDialogComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule,
    ScoreItemEditFormModule
  ],
  exports: [ScoreItemEditDialogComponent]
})
export class ScoreItemEditDialogModule { }
