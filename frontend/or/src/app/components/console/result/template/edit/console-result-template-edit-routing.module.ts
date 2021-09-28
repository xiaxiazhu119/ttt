import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsoleResultTemplateEditComponent } from './console-result-template-edit.component';


const routes: Routes = [{
  path: '',
  component: ConsoleResultTemplateEditComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleResultTemplateEditRoutingModule { }
