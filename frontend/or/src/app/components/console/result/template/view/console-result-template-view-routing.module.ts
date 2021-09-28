import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsoleResultTemplateViewComponent } from './console-result-template-view.component';


const routes: Routes = [{
  path: '',
  component: ConsoleResultTemplateViewComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleResultTemplateViewRoutingModule { }
