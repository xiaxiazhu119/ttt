import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsoleReviewViewComponent } from './console-review-view.component';


const routes: Routes = [{
  path: '',
  component: ConsoleReviewViewComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleReviewViewRoutingModule { }
