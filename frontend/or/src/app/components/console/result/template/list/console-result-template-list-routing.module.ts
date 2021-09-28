import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsoleResultTemplateListComponent } from './console-result-template-list.component';


const routes: Routes = [{
  path: '',
  component: ConsoleResultTemplateListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleResultTemplateListRoutingModule { }
