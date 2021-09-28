import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule } from '@angular/material';

import { ConsoleTaskViewRoutingModule } from './console-task-view-routing.module';
import { ConsoleTaskViewComponent } from './console-task-view.component';
import { GroupIncludeUserListModule, SharedResultListModule, SharedTaskViewModule } from '@app/modules/public-api';


@NgModule({
  declarations: [ConsoleTaskViewComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule,
    SharedTaskViewModule, SharedResultListModule, GroupIncludeUserListModule,
    ConsoleTaskViewRoutingModule
  ],
  exports: [ConsoleTaskViewComponent]
})
export class ConsoleTaskViewModule { }
