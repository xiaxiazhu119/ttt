import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsoleTaskListComponent } from './console-task-list.component';


const routes: Routes = [{
  path: '',
  component: ConsoleTaskListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleTaskListRoutingModule { }
