import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsoleDashboardIndexComponent } from './console-dashboard-index.component';



@NgModule({
  declarations: [ConsoleDashboardIndexComponent],
  imports: [
    CommonModule
  ],
  exports: [ConsoleDashboardIndexComponent]
})
export class ConsoleDashboardIndexModule { }
