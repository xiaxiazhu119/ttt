import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsoleResultTemplateViewRoutingModule } from './console-result-template-view-routing.module';
import { ConsoleResultTemplateViewComponent } from './console-result-template-view.component';


@NgModule({
  declarations: [ConsoleResultTemplateViewComponent],
  imports: [
    CommonModule,
    ConsoleResultTemplateViewRoutingModule
  ],
  exports: [ConsoleResultTemplateViewComponent]
})
export class ConsoleResultTemplateViewModule { }
