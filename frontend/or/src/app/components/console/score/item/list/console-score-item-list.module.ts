import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScoreItemEditDialogBtnModule, ScoreItemEditSlideBtnModule, SharedScoreItemListModule } from '@app/modules/public-api';

import { ConsoleScoreItemListComponent } from './console-score-item-list.component';

@NgModule({
  declarations: [ConsoleScoreItemListComponent],
  imports: [
    CommonModule,
    SharedScoreItemListModule, ScoreItemEditSlideBtnModule, ScoreItemEditDialogBtnModule
  ],
  exports: [ConsoleScoreItemListComponent]
})
export class ConsoleScoreItemListModule { }
