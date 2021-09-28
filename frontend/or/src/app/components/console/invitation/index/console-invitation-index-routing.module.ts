import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsoleInvitationIndexComponent } from './console-invitation-index.component';


const routes: Routes = [{
  path: '',
  component: ConsoleInvitationIndexComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleInvitationIndexRoutingModule { }
