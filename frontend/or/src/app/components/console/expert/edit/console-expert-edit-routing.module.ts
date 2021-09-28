import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsoleExpertEditComponent } from './console-expert-edit.component';

const routes: Routes = [{
  path: '',
  component: ConsoleExpertEditComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleExpertEditRoutingModule { }
