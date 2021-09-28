import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsoleReviewEditComponent } from './console-review-edit.component';


const routes: Routes = [{
  path: '',
  component: ConsoleReviewEditComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleReviewEditRoutingModule { }
