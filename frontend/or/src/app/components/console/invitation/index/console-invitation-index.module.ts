import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsoleInvitationIndexRoutingModule } from './console-invitation-index-routing.module';
import { ConsoleInvitationIndexComponent } from './console-invitation-index.component';


@NgModule({
  declarations: [ConsoleInvitationIndexComponent],
  imports: [
    CommonModule,
    ConsoleInvitationIndexRoutingModule
  ],
  exports: [ConsoleInvitationIndexComponent]
})
export class ConsoleInvitationIndexModule { }
