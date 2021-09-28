import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsoleResultListComponent } from './console-result-list.component';


const routes: Routes = [{
  path: '',
  component: ConsoleResultListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleResultListRoutingModule { }
