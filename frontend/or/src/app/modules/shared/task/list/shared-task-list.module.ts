import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatMenuModule } from '@angular/material';

import { XNgLibsBsPaginationModule, XNgLibsDirectiveModule } from 'x-ng-libs';

import { BaseScModule } from '../../sc/base/base-sc.module';

import { SharedTaskListComponent } from './shared-task-list.component';

@NgModule({
  declarations: [SharedTaskListComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatMenuModule,
    XNgLibsDirectiveModule, XNgLibsBsPaginationModule,
    BaseScModule,
  ],
  exports: [SharedTaskListComponent]
})
export class SharedTaskListModule { }
