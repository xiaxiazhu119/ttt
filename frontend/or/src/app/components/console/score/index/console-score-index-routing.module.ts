import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsoleScoreIndexComponent } from './console-score-index.component';

const routes: Routes = [{
  path: '',
  component: ConsoleScoreIndexComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleScoreIndexRoutingModule { }
