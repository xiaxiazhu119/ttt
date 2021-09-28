import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule } from '@angular/material';

import { SharedUserEditDialogBtnModule } from '@app/modules/shared/user/edit/btn/dialog/shared-user-edit-dialog-btn.module';
import { SharedUserEditSlideBtnModule } from '@app/modules/shared/user/edit/btn/slide/shared-user-edit-slide-btn.module';
import { SharedUserListModule } from '@app/modules/shared/user/list/shared-user-list.module';

import { OrganizationUserComponent } from './organization-user.component';

@NgModule({
  declarations: [OrganizationUserComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule,
    SharedUserEditDialogBtnModule, SharedUserEditSlideBtnModule, SharedUserListModule
  ],
  exports: [OrganizationUserComponent]
})
export class OrganizationUserModule { }
