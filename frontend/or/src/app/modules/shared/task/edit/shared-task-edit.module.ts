import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule } from '@angular/material';

import { SharedTaskEditComponent } from './shared-task-edit.component';
import { XNgLibsBsDatePickerModule } from 'x-ng-libs';
import { GroupListDialogBtnModule } from '@app/modules/group/btn/group-list/group-list-dialog-btn.module';
import { SharedGroupListModule } from '../../group/list/shared-group-list.module';
import { SharedScoreItemListModule } from '../../score/item/list/shared-score-item-list.module';
import { SharedResultTemplateListModule } from '../../result/template/list/shared-result-template-list.module';

@NgModule({
  declarations: [SharedTaskEditComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule,
    XNgLibsBsDatePickerModule,
    GroupListDialogBtnModule,
    SharedGroupListModule, SharedResultTemplateListModule,
    SharedScoreItemListModule
  ],
  exports: [SharedTaskEditComponent]
})
export class SharedTaskEditModule { }
