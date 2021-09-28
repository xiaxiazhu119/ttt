import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatMenuModule } from '@angular/material';

import { XNgLibsBsPaginationModule, XNgLibsDirectiveModule } from 'x-ng-libs';

import { BaseScModule } from '../../sc/base/base-sc.module';

import { SharedResultListComponent } from './shared-result-list.component';


@NgModule({
  declarations: [SharedResultListComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatMenuModule,
    XNgLibsDirectiveModule, XNgLibsBsPaginationModule,
    BaseScModule,
  ],
  exports: [SharedResultListComponent]
})
export class SharedResultListModule { }
