import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule, MatInputModule, MatButtonModule, } from '@angular/material';
import { XNgLibsDialogModule } from 'x-ng-libs';

import { GroupListDialogBtnComponent } from './group-list-dialog-btn.component';
import { GroupListDialogModule } from '../../dialog/group-list/group-list-dialog.module';
import { GroupListDialogComponent } from '../../dialog/group-list/group-list-dialog.component';

@NgModule({
  declarations: [GroupListDialogBtnComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatButtonModule,
    XNgLibsDialogModule,
    GroupListDialogModule
  ],
  exports: [GroupListDialogBtnComponent],
  entryComponents: [GroupListDialogComponent]
})
export class GroupListDialogBtnModule { }
