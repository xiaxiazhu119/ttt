import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatRadioModule } from '@angular/material';

import { XNgLibsDirectiveModule, XNgLibsBsPaginationModule } from 'x-ng-libs';

import { SharedGroupListComponent } from './shared-group-list.component';
import { BaseScModule } from '../../sc/base/base-sc.module';

@NgModule({
  declarations: [SharedGroupListComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatRadioModule,
    XNgLibsDirectiveModule, XNgLibsBsPaginationModule,
    BaseScModule,
  ],
  exports: [SharedGroupListComponent]
})
export class SharedGroupListModule { }
