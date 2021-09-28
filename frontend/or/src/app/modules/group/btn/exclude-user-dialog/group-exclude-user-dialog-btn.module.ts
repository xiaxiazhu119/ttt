import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule, MatInputModule, MatButtonModule, } from '@angular/material';
import { XNgLibsDialogModule } from 'x-ng-libs';

import { GroupExcludeUserDialogModule } from '../../dialog/exclude-user/group-exclude-user-dialog.module';
import { GroupExcludeUserDialogComponent } from '../../dialog/exclude-user/group-exclude-user-dialog.component';

import { GroupExcludeUserDialogBtnComponent } from './group-exclude-user-dialog-btn.component';

@NgModule({
  declarations: [GroupExcludeUserDialogBtnComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatButtonModule,
    XNgLibsDialogModule,
    GroupExcludeUserDialogModule
  ],
  exports: [GroupExcludeUserDialogBtnComponent],
  entryComponents: [GroupExcludeUserDialogComponent]
})
export class GroupExcludeUserDialogBtnModule { }
