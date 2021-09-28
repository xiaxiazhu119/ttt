import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatSlideToggleModule, MatTabsModule } from '@angular/material';

import { ConsoleScoreIndexRoutingModule } from './console-score-index-routing.module';
import { ConsoleScoreIndexComponent } from './console-score-index.component';
import { ConsoleScoreItemListModule } from '../item/list/console-score-item-list.module';
import { ConsoleScoreTemplateModule } from '../template/console-score-template.module';


@NgModule({
  declarations: [ConsoleScoreIndexComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatSlideToggleModule, MatTabsModule,
    ConsoleScoreItemListModule, ConsoleScoreTemplateModule,
    ConsoleScoreIndexRoutingModule
  ],
  exports: [ConsoleScoreIndexComponent]
})
export class ConsoleScoreIndexModule { }
