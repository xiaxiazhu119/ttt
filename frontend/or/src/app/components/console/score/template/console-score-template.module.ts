import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScoreTemplateModule } from '@app/modules/public-api';

import { ConsoleScoreTemplateComponent } from './console-score-template.component';

@NgModule({
  declarations: [ConsoleScoreTemplateComponent],
  imports: [
    CommonModule,
    ScoreTemplateModule
  ],
  exports: [ConsoleScoreTemplateComponent]
})
export class ConsoleScoreTemplateModule { }
