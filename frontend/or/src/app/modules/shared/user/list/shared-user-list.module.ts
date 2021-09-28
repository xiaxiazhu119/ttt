import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatSlideToggleModule, MatMenuModule } from '@angular/material';

import { XNgLibsDirectiveModule, XNgLibsBsPaginationModule } from 'x-ng-libs';

import { BaseScModule } from '../../sc/base/base-sc.module';

import { SharedUserListComponent } from './shared-user-list.component';

@NgModule({
  declarations: [SharedUserListComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatSlideToggleModule, MatMenuModule,
    XNgLibsDirectiveModule, XNgLibsBsPaginationModule,
    BaseScModule,
  ],
  exports: [SharedUserListComponent]
})
export class SharedUserListModule { }
