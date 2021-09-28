import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsoleResultViewRoutingModule } from './console-result-view-routing.module';
import { ConsoleResultViewComponent } from './console-result-view.component';
import { SharedResultViewModule } from '@app/modules/public-api';


@NgModule({
  declarations: [ConsoleResultViewComponent],
  imports: [
    CommonModule,
    SharedResultViewModule,
    ConsoleResultViewRoutingModule
  ],
  exports: [ConsoleResultViewComponent]
})
export class ConsoleResultViewModule { }
