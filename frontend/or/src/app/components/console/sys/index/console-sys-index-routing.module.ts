import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsoleSysIndexComponent } from './console-sys-index.component';


const routes: Routes = [{
  path: '',
  component: ConsoleSysIndexComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleSysIndexRoutingModule { }
