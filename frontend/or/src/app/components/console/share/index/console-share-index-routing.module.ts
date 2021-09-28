import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsoleShareIndexComponent } from './console-share-index.component';


const routes: Routes = [{
  path: '',
  component: ConsoleShareIndexComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleShareIndexRoutingModule { }
