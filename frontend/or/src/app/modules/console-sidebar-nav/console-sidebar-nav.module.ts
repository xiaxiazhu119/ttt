import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsoleSidebarNavComponent } from './console-sidebar-nav.component';



@NgModule({
  declarations: [ConsoleSidebarNavComponent],
  imports: [
    CommonModule
  ],
  exports: [ConsoleSidebarNavComponent]
})
export class ConsoleSidebarNavModule { }
