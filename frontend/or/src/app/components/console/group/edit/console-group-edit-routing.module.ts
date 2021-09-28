import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsoleGroupEditComponent } from './console-group-edit.component';


const routes: Routes = [{
  path: '',
  component: ConsoleGroupEditComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleGroupEditRoutingModule { }
