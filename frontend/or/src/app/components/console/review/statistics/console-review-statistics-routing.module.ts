import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsoleReviewStatisticsComponent } from './console-review-statistics.component';


const routes: Routes = [{
  path: '',
  component: ConsoleReviewStatisticsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleReviewStatisticsRoutingModule { }
