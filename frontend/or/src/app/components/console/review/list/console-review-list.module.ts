import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule } from '@angular/material';

import { XNgLibsDirectiveModule } from 'x-ng-libs';

import { ConsoleReviewListRoutingModule } from './console-review-list-routing.module';
import { ConsoleReviewListComponent } from './console-review-list.component';
import { SharedTaskListModule } from '@app/modules/public-api';


@NgModule({
  declarations: [ConsoleReviewListComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule,
    XNgLibsDirectiveModule,
    SharedTaskListModule,
    ConsoleReviewListRoutingModule
  ],
  exports: [ConsoleReviewListComponent]
})
export class ConsoleReviewListModule { }
