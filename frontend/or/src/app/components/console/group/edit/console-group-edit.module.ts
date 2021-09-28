import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule } from '@angular/material';

import { XNgLibsDirectiveModule } from 'x-ng-libs';

import { GroupExcludeUserListModule, GroupExcludeUserDialogBtnModule, GroupIncludeUserListModule } from '@app/modules/public-api';

import { ConsoleGroupEditRoutingModule } from './console-group-edit-routing.module';
import { ConsoleGroupEditComponent } from './console-group-edit.component';

@NgModule({
  declarations: [ConsoleGroupEditComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule,
    XNgLibsDirectiveModule,
    GroupExcludeUserDialogBtnModule, GroupExcludeUserListModule, GroupIncludeUserListModule,
    ConsoleGroupEditRoutingModule
  ],
  exports: [ConsoleGroupEditComponent]
})
export class ConsoleGroupEditModule { }
