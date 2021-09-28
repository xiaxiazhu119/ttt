import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsoleOrganizationEditComponent } from './console-organization-edit.component';


const routes: Routes = [{
  path: '',
  component: ConsoleOrganizationEditComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleOrganizationEditRoutingModule { }
