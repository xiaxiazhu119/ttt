import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsoleTaskEditComponent } from './console-task-edit.component';


const routes: Routes = [{
  path: '',
  component: ConsoleTaskEditComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleTaskEditRoutingModule { }
