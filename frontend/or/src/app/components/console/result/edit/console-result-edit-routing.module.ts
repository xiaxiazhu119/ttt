import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsoleResultEditComponent } from './console-result-edit.component';


const routes: Routes = [{
  path: '',
  component: ConsoleResultEditComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleResultEditRoutingModule { }
