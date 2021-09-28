import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsoleResultTemplateListRoutingModule } from './console-result-template-list-routing.module';
import { ConsoleResultTemplateListComponent } from './console-result-template-list.component';
import { SharedResultTemplateListModule } from '@app/modules/public-api';


@NgModule({
  declarations: [ConsoleResultTemplateListComponent],
  imports: [
    CommonModule,
    SharedResultTemplateListModule,
    ConsoleResultTemplateListRoutingModule
  ],
  exports: [ConsoleResultTemplateListComponent]
})
export class ConsoleResultTemplateListModule { }
