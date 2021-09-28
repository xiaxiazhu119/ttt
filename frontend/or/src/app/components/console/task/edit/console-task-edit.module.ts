import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsoleTaskEditRoutingModule } from './console-task-edit-routing.module';
import { ConsoleTaskEditComponent } from './console-task-edit.component';
import { SharedTaskEditModule } from '@app/modules/public-api';


@NgModule({
  declarations: [ConsoleTaskEditComponent],
  imports: [
    CommonModule,
    SharedTaskEditModule,
    ConsoleTaskEditRoutingModule
  ],
  exports: [ConsoleTaskEditComponent]
})
export class ConsoleTaskEditModule { }
