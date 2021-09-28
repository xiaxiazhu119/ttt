import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { XNgLibsDialogModule } from 'x-ng-libs';

import { ScoreItemEditDialogBtnComponent } from './score-item-edit-dialog-btn.component';

import { ScoreItemEditDialogModule } from '../../dialog/score-item-edit-dialog.module';
import { ScoreItemEditDialogComponent } from '../../dialog/score-item-edit-dialog.component';


@NgModule({
  declarations: [ScoreItemEditDialogBtnComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatButtonModule,
    XNgLibsDialogModule,
    ScoreItemEditDialogModule
  ],
  exports: [ScoreItemEditDialogBtnComponent],
  entryComponents: [ScoreItemEditDialogComponent]
})
export class ScoreItemEditDialogBtnModule { }
