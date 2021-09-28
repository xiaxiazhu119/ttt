import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebHeaderComponent } from './web-header.component';



@NgModule({
  declarations: [WebHeaderComponent],
  imports: [
    CommonModule
  ],
  exports: [WebHeaderComponent]
})
export class WebHeaderModule { }
