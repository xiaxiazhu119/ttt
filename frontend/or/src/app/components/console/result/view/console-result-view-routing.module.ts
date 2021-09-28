import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsoleResultViewComponent } from './console-result-view.component';


const routes: Routes = [{
  path: '',
  component: ConsoleResultViewComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleResultViewRoutingModule { }
