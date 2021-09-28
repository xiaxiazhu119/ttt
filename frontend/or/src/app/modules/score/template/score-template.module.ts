import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreTemplateComponent } from './score-template.component';



@NgModule({
  declarations: [ScoreTemplateComponent],
  imports: [
    CommonModule
  ],
  exports: [ScoreTemplateComponent]
})
export class ScoreTemplateModule { }
