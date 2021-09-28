import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCheckboxModule, MatRadioModule } from '@angular/material';

import { SharedGroupListModule } from '@app/modules/shared/group/list/shared-group-list.module';

import { GroupListDialogComponent } from './group-list-dialog.component';

@NgModule({
  declarations: [GroupListDialogComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCheckboxModule, MatRadioModule,
    SharedGroupListModule
  ],
  exports: [GroupListDialogComponent]
})
export class GroupListDialogModule { }
