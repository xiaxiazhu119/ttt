import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatMenuModule } from '@angular/material';

import { SharedTaskListModule } from '@app/modules/public-api';

import { ConsoleTaskListRoutingModule } from './console-task-list-routing.module';
import { ConsoleTaskListComponent } from './console-task-list.component';


@NgModule({
  declarations: [ConsoleTaskListComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatMenuModule,
    SharedTaskListModule,
    ConsoleTaskListRoutingModule
  ],
  exports: [ConsoleTaskListComponent]
})
export class ConsoleTaskListModule { }
