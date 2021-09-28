import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsoleExpertViewComponent } from './console-expert-view.component';

const routes: Routes = [{
  path: '',
  component: ConsoleExpertViewComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleExpertViewRoutingModule { }
