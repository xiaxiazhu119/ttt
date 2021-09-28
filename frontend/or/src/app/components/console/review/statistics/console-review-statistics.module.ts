import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatMenuModule } from '@angular/material';

import { XNgLibsBsPaginationModule, XNgLibsDirectiveModule } from 'x-ng-libs';

import { ConsoleReviewStatisticsRoutingModule } from './console-review-statistics-routing.module';
import { ConsoleReviewStatisticsComponent } from './console-review-statistics.component';


@NgModule({
  declarations: [ConsoleReviewStatisticsComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatMenuModule,
    XNgLibsDirectiveModule, XNgLibsBsPaginationModule,
    ConsoleReviewStatisticsRoutingModule
  ],
  exports: [ConsoleReviewStatisticsComponent]
})
export class ConsoleReviewStatisticsModule { }
