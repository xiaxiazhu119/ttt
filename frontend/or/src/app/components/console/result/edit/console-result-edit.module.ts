import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsoleResultEditRoutingModule } from './console-result-edit-routing.module';
import { ConsoleResultEditComponent } from './console-result-edit.component';
import { SharedResultEditModule } from '@app/modules/public-api';


@NgModule({
  declarations: [ConsoleResultEditComponent],
  imports: [
    CommonModule,
    SharedResultEditModule,
    ConsoleResultEditRoutingModule
  ],
  exports: [ConsoleResultEditComponent]
})
export class ConsoleResultEditModule { }
