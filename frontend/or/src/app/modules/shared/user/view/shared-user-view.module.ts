import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedUserViewComponent } from './shared-user-view.component';



@NgModule({
  declarations: [SharedUserViewComponent],
  imports: [
    CommonModule
  ],
  exports: [SharedUserViewComponent]
})
export class SharedUserViewModule { }
