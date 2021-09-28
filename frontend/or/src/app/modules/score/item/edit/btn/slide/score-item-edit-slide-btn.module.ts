import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule } from '@angular/material';

import { ScoreItemEditSlideBtnComponent } from './score-item-edit-slide-btn.component';
import { ScoreItemEditFormModule } from '../../form/score-item-edit-form.module';

@NgModule({
  declarations: [ScoreItemEditSlideBtnComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule,
    ScoreItemEditFormModule
  ],
  exports: [ScoreItemEditSlideBtnComponent]
})
export class ScoreItemEditSlideBtnModule { }
