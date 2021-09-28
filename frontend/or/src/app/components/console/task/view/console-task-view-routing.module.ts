import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsoleTaskViewComponent } from './console-task-view.component';


const routes: Routes = [{
  path: '',
  component: ConsoleTaskViewComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleTaskViewRoutingModule { }
