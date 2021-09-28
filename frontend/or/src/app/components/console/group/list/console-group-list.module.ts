import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule } from '@angular/material';

import { XNgLibsDirectiveModule } from 'x-ng-libs';

import { ConsoleGroupListRoutingModule } from './console-group-list-routing.module';
import { ConsoleGroupListComponent } from './console-group-list.component';
import { BaseScModule, SharedGroupListModule } from '@app/modules/public-api';


@NgModule({
  declarations: [ConsoleGroupListComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule,
    XNgLibsDirectiveModule,
    BaseScModule,
    SharedGroupListModule,
    ConsoleGroupListRoutingModule
  ],
  exports: [ConsoleGroupListComponent]
})
export class ConsoleGroupListModule { }
