import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsoleGroupListComponent } from './console-group-list.component';


const routes: Routes = [{
  path: '',
  component: ConsoleGroupListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleGroupListRoutingModule { }
