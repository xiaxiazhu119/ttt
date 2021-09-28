import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsoleOrganizationListComponent } from './console-organization-list.component';


const routes: Routes = [{
  path: '',
  component: ConsoleOrganizationListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleOrganizationListRoutingModule { }
