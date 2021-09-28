import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule } from '@angular/material';

import { XNgLibsDirectiveModule } from 'x-ng-libs';

import { GroupIncludeUserListComponent } from './group-include-user-list.component';

@NgModule({
  declarations: [GroupIncludeUserListComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule,
    XNgLibsDirectiveModule,
  ],
  exports: [GroupIncludeUserListComponent]
})
export class GroupIncludeUserListModule { }
