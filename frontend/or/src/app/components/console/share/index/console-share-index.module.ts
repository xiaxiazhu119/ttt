import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsoleShareIndexRoutingModule } from './console-share-index-routing.module';
import { ConsoleShareIndexComponent } from './console-share-index.component';


@NgModule({
  declarations: [ConsoleShareIndexComponent],
  imports: [
    CommonModule,
    ConsoleShareIndexRoutingModule
  ],
  exports: [ConsoleShareIndexComponent]
})
export class ConsoleShareIndexModule { }
