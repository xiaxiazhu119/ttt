import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsoleExpertListComponent } from './console-expert-list.component';

const routes: Routes = [{
  path: '',
  component: ConsoleExpertListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleExpertListRoutingModule { }
