import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsoleReviewListComponent } from './console-review-list.component';


const routes: Routes = [{
  path: '',
  component: ConsoleReviewListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleReviewListRoutingModule { }
