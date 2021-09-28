import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule } from '@angular/material';

import { SharedTaskViewComponent } from './shared-task-view.component';
// import { SharedResultListModule } from '../../result/list/shared-result-list.module';
// import { GroupIncludeUserListModule } from '@app/modules/group/user-list/include/group-include-user-list.module';

@NgModule({
  declarations: [SharedTaskViewComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule,
    // SharedResultListModule, GroupIncludeUserListModule
  ],
  exports: [SharedTaskViewComponent]
})
export class SharedTaskViewModule { }
