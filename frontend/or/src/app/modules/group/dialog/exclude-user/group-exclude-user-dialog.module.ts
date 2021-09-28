import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCheckboxModule, MatRadioModule } from '@angular/material';

import { GroupExcludeUserListModule } from '../../user-list/exclude/group-exclude-user-list.module';

import { GroupExcludeUserDialogComponent } from './group-exclude-user-dialog.component';

@NgModule({
  declarations: [GroupExcludeUserDialogComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCheckboxModule, MatRadioModule,
    GroupExcludeUserListModule
  ],
  exports: [GroupExcludeUserDialogComponent]
})
export class GroupExcludeUserDialogModule { }
